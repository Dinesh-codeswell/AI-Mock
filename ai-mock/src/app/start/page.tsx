// StartPage component
"use client";

import Image from "next/image";
import { useMemo, useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import lottie from "lottie-web";
import { createClient } from "@/lib/supabase-browser";
import type { AuthChangeEvent, Session } from "@supabase/supabase-js";

const ROLE_OPTIONS = [
  "Data Analyst",
  "Business Analyst",
  "Software Engineer",
  "Product Manager",
  "Data Scientist",
  "DevOps Engineer",
  "QA Engineer",
  "UX Designer",
  "Cloud Architect",
  "Platform Engineer",
  "AI Engineer",
  "Research Engineer",
];

function AnimationPlayer({
  src,
  animationData,
  speed = 0.7,
  scale = 1,
}: {
  src: string;
  animationData?: any;
  speed?: number;
  scale?: number;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const sizerRef = useRef<HTMLDivElement | null>(null);
  const [aspect, setAspect] = useState<string>("1 / 1");

  useEffect(() => {
    let anim: ReturnType<typeof lottie.loadAnimation> | null = null;
    let cancelled = false;
    (async () => {
      if (!containerRef.current) return;
      try {
        anim = lottie.loadAnimation({
          container: containerRef.current!,
          renderer: "svg",
          loop: true,
          autoplay: true,
          ...(animationData ? { animationData } : { path: encodeURI(src) }),
          rendererSettings: {
            preserveAspectRatio: "xMidYMid meet",
            progressiveLoad: animationData ? false : true,
            hideOnTransparent: true,
          },
        });
        anim.setSpeed(speed);
        // Lock aspect ratio from injected SVG viewBox for stable width-based scaling
        const setAspectFromSvg = () => {
          const svg = containerRef.current?.querySelector("svg");
          const vb = svg?.getAttribute("viewBox");
          if (vb) {
            const parts = vb.split(/\s+/).map(Number);
            if (parts.length === 4 && parts[2] > 0 && parts[3] > 0) {
              const w = parts[2];
              const h = parts[3];
              setAspect(`${w} / ${h}`);
            }
          }
          if (svg) {
            svg.style.width = "100%";
            svg.style.height = "100%";
            svg.style.display = "block";
            svg.style.margin = "auto";
            svg.style.transform = "none";
            svg.style.transformOrigin = "center";
          }
        };
        anim.addEventListener("DOMLoaded", setAspectFromSvg as any);
        anim.addEventListener("data_ready", setAspectFromSvg as any);
      } catch {}
    })();
    return () => {
      cancelled = true;
      try { anim?.destroy(); } catch {}
    };
  }, [src, animationData, speed, scale]);

  // Width-driven sizing with aspect ratio to avoid drastic jumps
  const pct = Math.max(40, Math.min(90, Math.round(scale * 100)));
  return (
    <div
      className="w-full h-full flex items-center justify-center"
      style={{
        pointerEvents: "none",
        opacity: 1,
        mixBlendMode: "normal",
      }}
    >
      <div
        ref={sizerRef}
        style={{
          width: `${pct}%`,
          aspectRatio: aspect,
        }}
      >
        <div
          ref={containerRef}
          style={{
            width: "100%",
            height: "100%",
          }}
        />
      </div>
    </div>
  );
}

export default function StartPage() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [promo, setPromo] = useState("");
  const [showRoleList, setShowRoleList] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ first?: string; last?: string; roles?: string }>({});
  const [step, setStep] = useState<1 | 2>(1);
  const [userChecked, setUserChecked] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeError, setResumeError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const MAX_RESUME_BYTES = 5 * 1024 * 1024; // 5MB
  const [animationMap, setAnimationMap] = useState<Record<string, any>>({});

  // Login guard: ensure authenticated user before enabling proceed and saving
  useEffect(() => {
    (async () => {
      const supabase = createClient();
      const { data: userData } = await supabase.auth.getUser();
      // For testing, do not redirect if unauthenticated; allow proceeding
      // If authenticated, great; otherwise still mark as checked to enable UI
      if (userData?.user) {
        setUserChecked(true);
      } else {
        setUserChecked(true);
      }
    })();
  }, [router]);

  function chooseRole(role: string) {
    // Set the selected role and auto-close the dropdown for a snappier UX
    setSelectedRole(role);
    setShowRoleList(false);
  }

  function validateAndContinue() {
    const nextErrors: typeof errors = {};
    if (!firstName.trim()) nextErrors.first = "First name is required";
    if (!lastName.trim()) nextErrors.last = "Last name is required";
    if (!selectedRole) nextErrors.roles = "Please select a role";
    // Show errors but do not block progression during testing
    setErrors(nextErrors);
    setStep(2);
  }

  // Auto-fetch first/last names from profiles via RPC when page loads
  useEffect(() => {
    const supabase = createClient();
    let mounted = true;
    (async () => {
      try {
        // Query params override and local storage fallback
        try {
          const url = new URL(window.location.href);
          const qFirst = url.searchParams.get("first");
          const qLast = url.searchParams.get("last");
          if (qFirst) setFirstName(qFirst);
          if (qLast) setLastName(qLast);
        } catch {}
        const cachedFirst = localStorage.getItem("firstName") || "";
        const cachedLast = localStorage.getItem("lastName") || "";
        if (cachedFirst && !firstName) setFirstName(cachedFirst);
        if (cachedLast && !lastName) setLastName(cachedLast);
        // Ensure the user is authenticated before fetching profile
        const { data: userData } = await supabase.auth.getUser();
        const uid = userData?.user?.id;
        if (!uid || !mounted) return;

        // Prefer RPC; handle both array and object shapes
        const { data: rpcData, error: rpcError } = await supabase.rpc("get_my_profile_names");
        const row = Array.isArray(rpcData) ? rpcData[0] : rpcData;
        if (!rpcError && row && mounted) {
          const f = row.first_name ?? "";
          const l = row.last_name ?? "";
          if (f && f !== firstName) setFirstName(f);
          if (l && l !== lastName) setLastName(l);
          return;
        }

        // Fallback to direct table query if RPC unavailable
        const { data: prof, error: profErr } = await supabase
          .from("profiles")
          .select("first_name,last_name")
          .eq("id", uid)
          .single();
        if (!profErr && prof && mounted) {
          const f = prof.first_name ?? "";
          const l = prof.last_name ?? "";
          if (f && f !== firstName) setFirstName(f);
          if (l && l !== lastName) setLastName(l);
          return;
        }

        // Last-resort fallback: try auth user metadata or email heuristics
        const meta = userData.user?.user_metadata || {} as any;
        const email = userData.user?.email || "";

        const metaFirst = meta.first_name || meta.given_name || meta.name?.split?.(" ")?.[0] || "";
        const metaLast = meta.last_name || meta.family_name || meta.name?.split?.(" ")?.slice(1)?.join(" ") || "";

        if (mounted) {
          if (metaFirst && metaFirst !== firstName) setFirstName(metaFirst);
          if (metaLast && metaLast !== lastName) setLastName(metaLast);

          if ((!firstName || !lastName) && email) {
            const local = email.split("@")[0] || "";
            const parts = local.split(/[._-]+/).filter(Boolean);
            if (parts[0] && parts[0] !== firstName) setFirstName(parts[0]);
            if (parts[1] && parts[1] !== lastName) setLastName(parts[1]);
          }
        }
      } catch (e) {
        // Silent fail; user can fill manually
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  // Update names in real time when auth state changes (e.g., user logs in)
  useEffect(() => {
    const supabase = createClient();
    const { data: listener } = supabase.auth.onAuthStateChange(async (_event: AuthChangeEvent, session: Session | null) => {
      try {
        const uid = session?.user?.id;
        if (!uid) return;
        const { data: prof, error } = await supabase
          .from("profiles")
          .select("first_name,last_name")
          .eq("id", uid)
          .single();
        if (!error && prof) {
          const f = prof.first_name ?? "";
          const l = prof.last_name ?? "";
          if (f && f !== firstName) setFirstName(f);
          if (l && l !== lastName) setLastName(l);
        }
      } catch {}
    });
    return () => {
      try { listener?.subscription?.unsubscribe?.(); } catch {}
    };
  }, [firstName, lastName]);

  // Prefetch animation JSON to reduce visible load latency between steps
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const files = [
          "/register.json",
          "/Female Employee Working on Data Security.json",
          "/job cv.json",
          "/document checking loader.json",
        ];
        const entries = await Promise.all(
          files.map(async (f) => {
            const res = await fetch(f, { cache: "force-cache" });
            const json = await res.json();
            return [f, json] as const;
          })
        );
        if (mounted) {
          const map: Record<string, any> = {};
          for (const [k, v] of entries) map[k] = v;
          setAnimationMap(map);
        }
      } catch {}
    })();
    return () => { mounted = false; };
  }, []);

  // Utility: add a timeout to promises to avoid indefinite spinners
  function withTimeout<T>(promise: Promise<T>, ms: number, label: string): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      const timer = setTimeout(() => {
        reject(new Error(`${label} timed out after ${ms}ms`));
      }, ms);
      promise
        .then((val) => { clearTimeout(timer); resolve(val); })
        .catch((err) => { clearTimeout(timer); reject(err); });
    });
  }

  return (
    <main
      className="w-full bg-white min-h-screen overflow-hidden"
    >
      {/* Main two-column layout */}
      {step === 1 && (
        <div className="flex flex-row w-full min-h-screen" style={{ position: "relative" }}>
          {/* Left: Form area (65%) */}
          <section className="relative shrink-0 bg-white py-10 pl-12 pr-10 flex flex-col overflow-hidden min-h-screen" style={{ flex: "0 0 65%" }}>
            {/* Logo */}
            <div style={{ marginBottom: 32 }}>
              <Image src="/beyond-career-main-logo.png" alt="Beyond Career Logo" height={40} width={160} priority style={{ objectFit: "contain" }} />
            </div>

            {/* Progress indicator */}
            <div className="mb-6 w-full max-w-[760px]">
              <div className="flex gap-2 w-full">
                <div className="w-1/2 h-1.5 rounded bg-gradient-to-r from-[#334EAC] to-[#4ebbf8]" />
                <div className="w-1/2 h-1.5 rounded bg-gray-200" />
              </div>
              <div className="mt-1 text-[13px] font-medium text-[#6B7280]">1 of 2</div>
            </div>

            {/* Header */}
            <h1 className="mt-6 mb-6 text-3xl md:text-4xl font-bold text-[#081F5C] leading-tight">
              {"Let's personalize your Beyond Career"}
            </h1>

            {/* Form fields container */}
            <div style={{ display: "flex", flexDirection: "column", gap: 24, width: "100%", maxWidth: 760 }}>
              {/* Name row */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
                {/* First name */}
                <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
                  <label className="flex items-center gap-1.5 text-[15.5px] font-medium text-[#1F2937] mb-1.5">
                    First Name <span style={{ color: "#EF4444" }}>*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your first name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full h-11 px-4 border border-gray-300 rounded-lg text-[15.5px] text-[#1F2937] bg-white outline-none focus:ring-2 focus:ring-[#4ebbf8]/40 focus:border-[#334EAC]"
                  />
                  {errors.first && <span style={{ fontFamily: "Inter", fontSize: 12, fontWeight: 400, color: "#EF4444", marginTop: 4, lineHeight: 1.4 }}>{errors.first}</span>}
                </div>
                {/* Last name */}
                <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
                  <label className="flex items-center gap-1.5 text-[15.5px] font-medium text-[#1F2937] mb-1.5">
                    Last Name <span style={{ color: "#EF4444" }}>*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full h-11 px-4 border border-gray-300 rounded-lg text-[15.5px] text-[#1F2937] bg-white outline-none focus:ring-2 focus:ring-[#4ebbf8]/40 focus:border-[#334EAC]"
                  />
                  {errors.last && <span style={{ fontFamily: "Inter", fontSize: 12, fontWeight: 400, color: "#EF4444", marginTop: 4 }}>{errors.last}</span>}
                </div>
              </div>

              {/* Role field */}
              <div className="flex flex-col w-full mb-5">
                <label className="flex items-center gap-1.5 text-[15.5px] font-medium text-[#1F2937] mb-1.5">
                  Your current role (or the role you are applying for) <span style={{ color: "#EF4444" }}>*</span>
                </label>
                <div style={{ position: "relative" }}>
                  <button
                    type="button"
                    onClick={() => setShowRoleList((v) => !v)}
                    className="flex items-center justify-between w-full h-11 px-4 border border-gray-300 rounded-lg bg-white cursor-pointer"
                  >
                    <span className="text-[15.5px] text-left" style={{ color: selectedRole ? "#1F2937" : "#9CA3AF" }}>{selectedRole ? selectedRole : "Select one role"}</span>
                    <span aria-hidden className="text-[#6B7280] transition-transform" style={{ transform: showRoleList ? "rotate(180deg)" : "rotate(0deg)" }}>▼</span>
                  </button>
                  {showRoleList && (
                    <div style={{ position: "absolute", zIndex: 10 }} className="mt-2 w-full border border-gray-200 rounded-lg bg-white shadow max-h-40 overflow-auto role-scroll pl-2">
                      {ROLE_OPTIONS.map((role) => (
                        <label key={role} className="flex items-center justify-between px-5 py-1.5 cursor-pointer hover:bg-[#F9FAFB]">
                          <span className="text-[14.5px] text-[#1F2937]">{role}</span>
                          <input type="radio" name="selectedRole" checked={selectedRole === role} onChange={() => chooseRole(role)} />
                        </label>
                      ))}
                    </div>
                  )}
                </div>
                {errors.roles && <span style={{ fontSize: 12, color: "#EF4444", marginTop: 4 }}>{errors.roles}</span>}
                {/* Single-select; pills removed */}
              </div>

              {/* Promo code */}
              <div className="flex flex-col w-full">
                <label className="text-[15.5px] font-medium text-[#1F2937] mb-1.5">Got a referral or promo code? (optional)</label>
                <input
                  type="text"
                  placeholder="Copy & paste code, e.g. BEEXX"
                  value={promo}
                  onChange={(e) => setPromo(e.target.value)}
                  className="w-full h-11 px-4 border border-gray-300 rounded-lg text-[15.5px] text-[#1F2937] bg-white outline-none focus:ring-2 focus:ring-[#4ebbf8]/40 focus:border-[#334EAC]"
                />
              </div>
            </div>

            {/* Submit button: shift ~40% to the left from container start */}
            <div className="flex justify-start w-full max-w-[760px] mt-8" style={{ marginLeft: "70%" }}>
              <button
                type="button"
                onClick={validateAndContinue}
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 h-12 min-w-[200px] rounded-xl text-white font-semibold text-[16.5px] bg-gradient-to-r from-[#334EAC] to-[#4ebbf8] shadow hover:opacity-90 hover:-translate-y-0.5 transition whitespace-nowrap"
              >
                Continue →
              </button>
            </div>
            {/* Seam blend: soft gradient to reduce harsh separation with animation pane */}
            <div
              aria-hidden
              className="pointer-events-none absolute top-0 right-0 h-full"
              style={{
                width: 28,
                background:
                  "linear-gradient(to right, rgba(255,255,255,1) 0%, rgba(255,255,255,0.0) 55%, rgba(247,251,255,0.55) 100%)",
              }}
            />
            {/* Seam blend: soft gradient to reduce harsh separation with animation pane */}
            <div
              aria-hidden
              className="pointer-events-none absolute top-0 right-0 h-full"
              style={{
                width: 28,
                background:
                  "linear-gradient(to right, rgba(255,255,255,1) 0%, rgba(255,255,255,0.0) 55%, rgba(247,251,255,0.55) 100%)",
              }}
            />
          </section>

          {/* Right: Preview area (35%) — light blue, two fixed-height frames */}
          <aside className="shrink-0 px-6 py-6 flex flex-col overflow-hidden min-h-screen sticky top-0" style={{ flex: "0 0 35%", background: "#F7FBFF", rowGap: "calc(1.5rem * 1.10)" }}>
            {/**
             * Two frames, each: height = (100vh - (vertical padding + gap)) / 2
             * padding-y: 1.5rem * 2 = 3rem = 48px; gap-6 = 1.5rem = 24px => total = 72px
             */}
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "calc((100vh - 72px) / 2)",
                borderRadius: 12,
                overflow: "hidden",
                background: "transparent",
              }}
            >
              <AnimationPlayer src="/register.json" animationData={animationMap["/register.json"]} speed={0.7} scale={0.83} />
            </div>
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "calc((100vh - 72px) / 2)",
                borderRadius: 12,
                overflow: "hidden",
                background: "transparent",
              }}
            >
              <AnimationPlayer src="/Female Employee Working on Data Security.json" animationData={animationMap["/Female Employee Working on Data Security.json"]} speed={0.3} scale={0.83} />
            </div>
          </aside>
        </div>
      )}

      {step === 2 && (
        <div className="flex flex-row w-full min-h-screen">
          {/* Left: Step 2 content (65%) */}
          <section className="relative shrink-0 bg-white py-10 pl-12 pr-10 flex flex-col overflow-hidden min-h-screen" style={{ flex: "0 0 65%" }}>
            {/* Logo */}
            <div style={{ marginBottom: 32 }}>
              <Image src="/beyond-career-main-logo.png" alt="Beyond Career Logo" height={40} width={160} priority style={{ objectFit: "contain" }} />
            </div>
            {/* Progress indicator for step 2 */}
            <div className="mb-6 w-full max-w-[760px]">
              <div className="flex gap-2 w-full">
                <div className="w-full h-1.5 rounded bg-gradient-to-r from-[#334EAC] to-[#4ebbf8]" />
              </div>
              <div className="mt-1 text-[13px] font-medium text-[#6B7280]">2 of 2</div>
            </div>

            {/* Header and sub */}
            <h2 className="mt-6 mb-2 text-2xl font-bold text-[#081F5C] leading-tight">
              Beyond Career works smarter with your CV
            </h2>
            <p className="text-[14px] text-black/70 mb-4 max-w-[760px]">
              Upload your most recent CV to personalize your AI assistance.
            </p>

            {/* Upload box */}
            <div className="bg-white border border-gray-200 rounded-xl p-5 w-full max-w-[760px]">
              <label className="text-[14px] font-medium text-[#1F2937] mb-2 block">
                Upload your most recent CV <span style={{ color: "#EF4444" }}>*</span>
              </label>
              <div
                className="border-2 border-dashed rounded-xl min-h-[180px] flex items-center justify-center flex-col gap-2 p-4"
                style={{ borderColor: "#334EAC" }}
                onDragOver={(e) => { e.preventDefault(); }}
                onDrop={(e) => {
                  e.preventDefault();
                  const file = e.dataTransfer.files?.[0];
                  if (file) {
                    if (file.size > MAX_RESUME_BYTES) {
                      setResumeError("File exceeds 5MB limit. Please choose a smaller file.");
                      setResumeFile(null);
                    } else {
                      setResumeError(null);
                      setResumeFile(file);
                    }
                  }
                }}
              >
                <div className="w-8 h-8 rounded-lg bg-[#BAD6EB]/20 border border-[#334EAC] flex items-center justify-center text-[#334EAC] font-bold">📄</div>
                <div className="text-[14px] text-[#1F2937]">{resumeFile ? "File ready" : "Drop file here"}</div>
                <div className="text-[12px] text-[#6B7280]">Supported format: pdf, txt, docx, doc up to 5MB</div>
                <div className="text-[12px] text-[#9CA3AF] mt-1">OR</div>
                <label className="text-[13px] text-[#334EAC] cursor-pointer underline">
                  Browse file
                  <input
                    type="file"
                    accept=".pdf,.txt,.doc,.docx"
                    style={{ display: "none" }}
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) {
                        if (f.size > MAX_RESUME_BYTES) {
                          setResumeError("File exceeds 5MB limit. Please choose a smaller file.");
                          setResumeFile(null);
                        } else {
                          setResumeError(null);
                          setResumeFile(f);
                        }
                      }
                    }}
                  />
                </label>
                {resumeFile && (
                  <div className="mt-2 text-[12px] text-[#6B7280]">
                    Selected: {resumeFile.name}
                  </div>
                )}
                {resumeError && (
                  <div className="mt-2 text-[12px] text-[#EF4444]">
                    {resumeError}
                  </div>
                )}
              </div>
            </div>

            {/* Bottom actions: Back + Proceed (remove LinkedIn section entirely) */}
            <div className="flex justify-between items-center w-full max-w-[760px] mt-4">
              <button
                type="button"
                aria-label="Go back to Step 1"
                onClick={() => setStep(1)}
                className="inline-flex items-center gap-2 px-4 py-2 h-10 bg-white border border-gray-300 rounded-lg text-[14px] font-semibold text-[#1F2937] hover:bg-[#F9FAFB]"
              >
                ← Back
              </button>

              <button
                type="button"
                aria-label="Proceed to next step"
                disabled={isSubmitting}
                onClick={() => {
                  setIsSubmitting(true);
                  setResumeError(null);
                  const supabase = createClient();
                  const roleParam = selectedRole ? `?role=${encodeURIComponent(selectedRole)}` : "";

                  // Best-effort: enter full-screen via user gesture before navigating
                  (async () => {
                    try {
                      document.documentElement.style.overflow = "hidden";
                      document.body.style.overflow = "hidden";
                      if (!document.fullscreenElement) {
                        const opts: any = { navigationUI: "hide" };
                        await (document.documentElement as any).requestFullscreen?.(opts);
                      }
                    } catch {}
                  })();

                  // Navigate immediately; do not block on uploads
                  router.push(`/ai-interview/session${roleParam}`);
                  setIsSubmitting(false);

                  // Best-effort background save (if user signed in and a file is selected)
                  (async () => {
                    try {
                      const { data: userData } = await supabase.auth.getUser();
                      if (!userData?.user?.id || !resumeFile) return;

                      const userId = userData.user.id;
                      const safeName = resumeFile.name.replace(/[^a-zA-Z0-9._-]/g, "_");
                      const objectPath = `${userId}/${Date.now()}-${safeName}`;

                      // Upload resume with timeoutjson
                  
                      await withTimeout(
                        supabase.storage
                          .from("resumes")
                          .upload(objectPath, resumeFile, {
                            upsert: false,
                            contentType: resumeFile.type || "application/octet-stream",
                          }),
                        7000,
                        "Resume upload"
                      );

                      // Try RPC intake creation; if it fails, fallback to direct insert
                      try {
                        await withTimeout(
                          supabase.rpc(
                            "create_interview_intake",
                            {
                              p_role_name: selectedRole,
                              p_resume_name: resumeFile.name,
                              p_resume_object_path: objectPath,
                              p_resume_size_bytes: resumeFile.size,
                            }
                          ),
                          7000,
                          "Intake creation"
                        );
                      } catch (rpcErr) {
                        // Fallback: resolve role and insert intake directly
                        try {
                          let roleId: number | null = null;
                          const { data: roleRows, error: roleQueryError } = await supabase
                            .from("interview_roles")
                            .select("id")
                            .ilike("name", selectedRole || "")
                            .limit(1);
                          if (!roleQueryError && roleRows && roleRows.length > 0) {
                            roleId = (roleRows[0] as any).id as number;
                          } else if (selectedRole) {
                            const { data: insertRoleRows, error: insertRoleError } = await supabase
                              .from("interview_roles")
                              .insert({ name: selectedRole })
                              .select("id")
                              .limit(1);
                            if (!insertRoleError && insertRoleRows && insertRoleRows.length > 0) {
                              roleId = (insertRoleRows[0] as any).id as number;
                            }
                          }
                          if (roleId) {
                            await supabase
                              .from("interview_intake")
                              .insert({
                                user_id: userId,
                                role_id: roleId,
                                resume_name: resumeFile.name,
                                resume_object_path: objectPath,
                                resume_size_bytes: resumeFile.size,
                              });
                          }
                        } catch {}
                      }
                    } catch (err) {
                      // Ignore background save errors; navigation already occurred
                    }
                  })();
                }}
                className={`inline-flex items-center justify-center gap-2 px-6 py-3 h-11 min-w-[140px] rounded-xl text-white font-bold text-[14px] bg-gradient-to-r from-[#334EAC] to-[#4ebbf8] shadow transition ${isSubmitting ? "opacity-70 cursor-not-allowed" : "hover:opacity-90 hover:-translate-y-0.5"}`}
              >
                Proceed →
              </button>
            </div>
          </section>

          {/* Right: Step 2 previews (35%) */}
          <aside className="shrink-0 px-6 py-6 flex flex-col overflow-hidden h-screen" style={{ flex: "0 0 35%", background: "#F7FBFF", rowGap: "calc(1.5rem * 1.10)" }}>
            {/**
             * Keep both animation frames visible without page scroll:
             * Two frames, each: height = (100vh - (vertical padding + gap)) / 2
             * padding-y: 1.5rem * 2 = 3rem = 48px; gap-6 = 1.5rem = 24px => total = 72px
             */}
            <div
              className="flex items-center justify-center p-2"
              style={{
                width: "100%",
                height: "calc((100vh - 72px) / 2)",
                borderRadius: 12,
                overflow: "hidden",
                background: "transparent",
              }}
            >
              <AnimationPlayer src="/job cv.json" animationData={animationMap["/job cv.json"]} speed={0.7} scale={0.79} />
            </div>
            <div
              className="flex items-center justify-center p-2"
              style={{
                width: "100%",
                height: "calc((100vh - 72px) / 2)",
                borderRadius: 12,
                overflow: "hidden",
                background: "transparent",
              }}
            >
              <AnimationPlayer src="/document checking loader.json" animationData={animationMap["/document checking loader.json"]} speed={0.7} scale={0.79} />
            </div>
          </aside>
        </div>
      )}

      {/* User avatar badge - REMOVE */}
      {/* Removed the bottom-left BC welcome tile as requested */}
      <style jsx>{`
        .role-scroll { scrollbar-width: thin; }
        .role-scroll::-webkit-scrollbar { width: 6px; height: 6px; }
        .role-scroll::-webkit-scrollbar-thumb { background: #C9D7EE; border-radius: 4px; }
        .role-scroll::-webkit-scrollbar-track { background: transparent; }
      `}</style>
    </main>
  );
}