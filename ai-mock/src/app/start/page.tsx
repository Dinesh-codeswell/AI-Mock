"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

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

export default function StartPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [promo, setPromo] = useState("");
  const [showRoleList, setShowRoleList] = useState(false);
  const [roles, setRoles] = useState<string[]>([]);
  const [errors, setErrors] = useState<{ first?: string; last?: string; roles?: string }>({});
  const [step, setStep] = useState<1 | 2>(1);

  const canAddMoreRoles = useMemo(() => roles.length < 3, [roles.length]);

  function toggleRole(role: string) {
    setRoles((prev) => {
      if (prev.includes(role)) return prev.filter((r) => r !== role);
      if (!canAddMoreRoles) return prev; // enforce max 3
      return [...prev, role];
    });
  }

  function validateAndContinue() {
    const nextErrors: typeof errors = {};
    if (!firstName.trim()) nextErrors.first = "First name is required";
    if (!lastName.trim()) nextErrors.last = "Last name is required";
    if (roles.length === 0) nextErrors.roles = "Please select at least one role";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      setStep(2);
    }
  }

  return (
    <main
      className="w-full"
      style={{ backgroundColor: "#FFFFFF", height: "100vh", overflow: "hidden" }}
    >
      {/* Main two-column layout */}
      {step === 1 && (
        <div style={{ display: "flex", flexDirection: "row", width: "100%", height: "100vh", gap: 0, position: "relative" }}>
          {/* Left: Form area (60%) */}
          <section
            style={{
              flex: "1 1 60%",
              maxWidth: "60%",
              backgroundColor: "#FFFFFF",
              paddingTop: 40,
              paddingBottom: 40,
              paddingLeft: 48,
              paddingRight: 40,
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              height: "100vh",
            }}
          >
            {/* Logo */}
            <div style={{ marginBottom: 32 }}>
              <Image src="/beyond-career-main-logo.png" alt="Beyond Career Logo" height={40} width={160} priority style={{ objectFit: "contain" }} />
            </div>

            {/* Progress indicator */}
            <div style={{ marginBottom: 24, width: "100%", maxWidth: 760 }}>
              <div style={{ display: "flex", gap: 8, width: "100%" }}>
                <div style={{ width: "50%", height: 4, backgroundColor: "#F59E0B", borderRadius: 2 }} />
                <div style={{ width: "50%", height: 4, backgroundColor: "#E5E7EB", borderRadius: 2 }} />
              </div>
              <div style={{ marginTop: 6, fontFamily: "Inter, -apple-system, system-ui, sans-serif", fontSize: 13, fontWeight: 500, color: "#6B7280" }}>1 of 2</div>
            </div>

            {/* Header */}
            <h1 style={{ marginTop: 24, marginBottom: 24, fontFamily: "Inter, -apple-system, system-ui, sans-serif", fontSize: 28, fontWeight: 700, color: "#000000", lineHeight: 1.2, letterSpacing: "-0.02em" }}>
              Let's personalize your Beyond Career
            </h1>

            {/* Form fields container */}
            <div style={{ display: "flex", flexDirection: "column", gap: 24, width: "100%", maxWidth: 760 }}>
              {/* Name row */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
                {/* First name */}
                <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
                  <label style={{ display: "flex", alignItems: "center", gap: 4, fontFamily: "Inter, -apple-system", fontSize: 14, fontWeight: 500, color: "#1F2937", marginBottom: 6 }}>
                    First Name <span style={{ color: "#EF4444" }}>*</span>
                  </label>
                  <input type="text" placeholder="Enter your first name" value={firstName} onChange={(e) => setFirstName(e.target.value)} style={{ width: "100%", height: 40, padding: "10px 14px", border: "1px solid #D1D5DB", borderRadius: 8, fontFamily: "Inter, -apple-system", fontSize: 14, fontWeight: 400, color: "#1F2937", backgroundColor: "#FFFFFF", outline: "none" }} />
                  {errors.first && <span style={{ fontFamily: "Inter", fontSize: 12, fontWeight: 400, color: "#EF4444", marginTop: 4, lineHeight: 1.4 }}>{errors.first}</span>}
                </div>
                {/* Last name */}
                <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
                  <label style={{ display: "flex", alignItems: "center", gap: 4, fontFamily: "Inter, -apple-system", fontSize: 14, fontWeight: 500, color: "#1F2937", marginBottom: 6 }}>
                    Last Name <span style={{ color: "#EF4444" }}>*</span>
                  </label>
                  <input type="text" placeholder="Enter your last name" value={lastName} onChange={(e) => setLastName(e.target.value)} style={{ width: "100%", height: 40, padding: "10px 14px", border: "1px solid #D1D5DB", borderRadius: 8, fontFamily: "Inter, -apple-system", fontSize: 14, fontWeight: 400, color: "#1F2937", backgroundColor: "#FFFFFF" }} />
                  {errors.last && <span style={{ fontFamily: "Inter", fontSize: 12, fontWeight: 400, color: "#EF4444", marginTop: 4 }}>{errors.last}</span>}
                </div>
              </div>

              {/* Role field */}
              <div style={{ display: "flex", flexDirection: "column", width: "100%", marginBottom: 20 }}>
                <label style={{ display: "flex", alignItems: "center", gap: 4, fontFamily: "Inter, -apple-system", fontSize: 14, fontWeight: 500, color: "#1F2937", marginBottom: 6 }}>
                  Your current role (or the role you are applying for) <span style={{ color: "#EF4444" }}>*</span>
                </label>
                <div style={{ position: "relative" }}>
                  <button type="button" onClick={() => setShowRoleList((v) => !v)} style={{ display: "flex", alignItems: "center", width: "100%", minHeight: 40, padding: "8px 14px", border: "1px solid #D1D5DB", borderRadius: 8, backgroundColor: "#FFFFFF", cursor: "pointer" }}>
                    <span style={{ fontFamily: "Inter", fontSize: 14, color: roles.length ? "#1F2937" : "#9CA3AF" }}>{roles.length ? `${roles.length} selected` : "You can select up to 3 roles at a time."}</span>
                    <span aria-hidden style={{ marginLeft: "auto", color: "#6B7280", transition: "transform 0.2s ease", transform: showRoleList ? "rotate(180deg)" : "rotate(0deg)" }}>▼</span>
                  </button>
                  {showRoleList && (
                    <div style={{ position: "absolute", zIndex: 10, marginTop: 8, width: "100%", border: "1px solid #E5E7EB", borderRadius: 8, backgroundColor: "#FFFFFF", boxShadow: "0 4px 12px rgba(0,0,0,0.06)", maxHeight: 160, overflow: "auto" }}>
                      {ROLE_OPTIONS.map((role) => (
                        <label key={role} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "6px 14px", cursor: "pointer" }}>
                          <span style={{ fontSize: 13, color: "#1F2937" }}>{role}</span>
                          <input type="checkbox" checked={roles.includes(role)} onChange={() => toggleRole(role)} />
                        </label>
                      ))}
                    </div>
                  )}
                </div>
                {errors.roles && <span style={{ fontSize: 12, color: "#EF4444", marginTop: 4 }}>{errors.roles}</span>}

                {/* Selected pills */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 }}>
                  {roles.map((r) => (
                    <span key={r} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 10px", borderRadius: 100, border: "1px solid #D1D5DB", background: "#FFFFFF", fontSize: 12 }}>
                      {r}
                      <button type="button" onClick={() => toggleRole(r)} aria-label={`Remove ${r}`} style={{ color: "#6B7280" }}>
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Promo code */}
              <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
                <label style={{ fontFamily: "Inter", fontSize: 14, fontWeight: 500, color: "#1F2937", marginBottom: 6 }}>Got a referral or promo code? (optional)</label>
                <input type="text" placeholder="Copy & paste code, e.g. BEEXX" value={promo} onChange={(e) => setPromo(e.target.value)} style={{ width: "100%", height: 40, padding: "10px 14px", border: "1px solid #D1D5DB", borderRadius: 8, fontFamily: "Inter", fontSize: 14, color: "#1F2937", backgroundColor: "#FFFFFF" }} />
              </div>
            </div>

            {/* Submit button */}
            <div style={{ display: "flex", justifyContent: "flex-end", width: "100%", maxWidth: 760, marginTop: 20 }}>
              <button type="button" onClick={validateAndContinue} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "12px 24px", height: 44, minWidth: 140, backgroundColor: "#F59E0B", border: "none", borderRadius: 10, fontFamily: "Inter, -apple-system", fontSize: 15, fontWeight: 600, color: "#FFFFFF", cursor: "pointer", boxShadow: "0 2px 8px rgba(245, 158, 11, 0.2)" }} className="hover:translate-y-[-1px]">
                Continue →
              </button>
            </div>
          </section>

          {/* Right: Preview area (40%) */}
          <aside style={{ flex: "1 1 40%", maxWidth: "40%", backgroundColor: "#FEF3C7", padding: "24px 20px", display: "flex", flexDirection: "column", gap: 24, overflow: "hidden", height: "100vh", position: "sticky", top: 0 }}>
            {/* Preview card 1 */}
            <div style={{ width: "100%", backgroundColor: "#FFFFFF", border: "1px solid #E5E7EB", borderRadius: 14, padding: 14, boxShadow: "0 4px 16px rgba(0,0,0,0.06)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <div style={{ display: "flex", gap: 6 }}>
                  <span style={{ width: 16, height: 16, background: "#F59E0B", borderRadius: 4 }} />
                  <span style={{ width: 16, height: 16, background: "#10B981", borderRadius: 4 }} />
                  <span style={{ width: 16, height: 16, background: "#3B82F6", borderRadius: 4 }} />
                </div>
                <div style={{ fontFamily: "Inter", fontSize: 15, fontWeight: 600, color: "#1F2937" }}>Your path to interview success</div>
              </div>
              <div style={{ padding: 6, background: "#FFFFFF" }}>
                <Image src="/window.svg" alt="Main Dashboard Interface" width={340} height={102} className="w-full h-auto" />
              </div>
              <div style={{ textAlign: "right", fontFamily: "Inter", fontSize: 12, fontWeight: 500, color: "#6B7280", fontStyle: "italic", paddingTop: 4 }}>Main Dashboard Interface</div>
            </div>

            {/* Preview card 2 */}
            <div style={{ width: "100%", backgroundColor: "#FFFFFF", border: "1px solid #E5E7EB", borderRadius: 14, padding: 14, boxShadow: "0 4px 16px rgba(0,0,0,0.06)" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-start", marginBottom: 12 }}>
                <div style={{ fontFamily: "Inter", fontSize: 15, fontWeight: 600, color: "#1F2937" }}>Ace your live interview</div>
              </div>
              <div style={{ padding: 6, background: "#FFFFFF" }}>
                <Image src="/window.svg" alt="Work Experience Stories Preview" width={340} height={96} className="w-full h-auto" />
              </div>
              <div style={{ textAlign: "center", fontFamily: "Inter", fontSize: 12, fontWeight: 500, color: "#6B7280", fontStyle: "italic", paddingTop: 6 }}>Work Experience Stories Preview</div>
            </div>
          </aside>
        </div>
      )}

      {step === 2 && (
        <div style={{ display: "flex", flexDirection: "row", width: "100%", height: "100vh", gap: 0 }}>
          {/* Left: Step 2 content */}
          <section style={{ flex: "1 1 60%", maxWidth: "60%", backgroundColor: "#FFFFFF", paddingTop: 40, paddingBottom: 40, paddingLeft: 48, paddingRight: 40, display: "flex", flexDirection: "column", overflow: "hidden", height: "100vh" }}>
            {/* Logo */}
            <div style={{ marginBottom: 32 }}>
              <Image src="/beyond-career-main-logo.png" alt="Beyond Career Logo" height={40} width={160} priority style={{ objectFit: "contain" }} />
            </div>
            {/* Progress indicator for step 2 */}
            <div style={{ marginBottom: 24, width: "100%", maxWidth: 760 }}>
              <div style={{ display: "flex", gap: 8, width: "100%" }}>
                <div style={{ width: "100%", height: 4, backgroundColor: "#F59E0B", borderRadius: 2 }} />
              </div>
              <div style={{ marginTop: 6, fontFamily: "Inter, -apple-system, system-ui, sans-serif", fontSize: 13, fontWeight: 500, color: "#6B7280" }}>2 of 2</div>
            </div>
            {/* Header and sub */}
            <h2 style={{ marginTop: 24, marginBottom: 8, fontFamily: "Inter, -apple-system", fontSize: 24, fontWeight: 700, color: "#111827", lineHeight: 1.25 }}>
              InterviewBee works smarter with your CV and LinkedIn
            </h2>
            <p style={{ fontFamily: "Inter", fontSize: 14, color: "#374151", marginBottom: 16, maxWidth: 760 }}>
              We use your CV and LinkedIn profile to personalize AI assistance — whether you're practicing or in a real interview.
            </p>
            {/* Upload box */}
            <div style={{ background: "#FFFFFF", border: "1px solid #E5E7EB", borderRadius: 12, padding: 20, width: "100%", maxWidth: 760 }}>
              <label style={{ fontFamily: "Inter", fontSize: 14, fontWeight: 500, color: "#1F2937", marginBottom: 8, display: "block" }}>Upload your most recent CV <span style={{ color: "#EF4444" }}>*</span></label>
              <div style={{ border: "2px dashed #F59E0B", borderRadius: 12, height: 180, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 8 }}
                   onDragOver={(e) => { e.preventDefault(); }}
                   onDrop={(e) => { e.preventDefault(); const file = e.dataTransfer.files?.[0]; if (file) console.log("Dropped:", file.name); }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: "#FFF7ED", border: "1px solid #F59E0B", display: "flex", alignItems: "center", justifyContent: "center", color: "#F59E0B", fontWeight: 700 }}>📄</div>
                <div style={{ fontFamily: "Inter", fontSize: 14, color: "#1F2937" }}>Drop file here</div>
                <div style={{ fontFamily: "Inter", fontSize: 12, color: "#6B7280" }}>Supported format: pdf, txt, docx, doc up to 15MB</div>
                <div style={{ fontFamily: "Inter", fontSize: 12, color: "#9CA3AF", marginTop: 4 }}>OR</div>
                <label style={{ fontFamily: "Inter", fontSize: 13, color: "#2563EB", cursor: "pointer", textDecoration: "underline" }}>
                  Browse file
                  <input type="file" accept=".pdf,.txt,.doc,.docx" style={{ display: "none" }} onChange={(e) => { const f = e.target.files?.[0]; if (f) console.log("Selected:", f.name); }} />
                </label>
              </div>
            </div>
            {/* LinkedIn optional */}
            <div style={{ marginTop: 16, background: "#FFFFFF", border: "1px solid #E5E7EB", borderRadius: 12, padding: 20, width: "100%", maxWidth: 760 }}>
              <div style={{ fontFamily: "Inter", fontSize: 14, fontWeight: 500, color: "#1F2937", marginBottom: 10 }}>Connect your LinkedIn profile (Optional)</div>
              <button type="button" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#2563EB", color: "#FFFFFF", borderRadius: 8, padding: "10px 14px", fontFamily: "Inter", fontSize: 14, fontWeight: 600, border: "none", cursor: "pointer" }}>
                <Image src="/globe.svg" alt="LinkedIn" width={18} height={18} /> Connect with LinkedIn
              </button>
              <div style={{ marginTop: 8, fontFamily: "Inter", fontSize: 12, color: "#6B7280" }}>* Personalized AI responses from your LinkedIn profile (optional)</div>
            </div>
          </section>

          {/* Right: Step 2 previews */}
          <aside style={{ flex: "1 1 40%", maxWidth: "40%", backgroundColor: "#FEF3C7", padding: "24px 20px", display: "flex", flexDirection: "column", gap: 24, overflow: "hidden", height: "100vh" }}>
            <div style={{ width: "100%", backgroundColor: "#FFFFFF", border: "1px solid #E5E7EB", borderRadius: 14, padding: 14, boxShadow: "0 4px 16px rgba(0,0,0,0.06)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <div style={{ display: "flex", gap: 6 }}>
                  <span style={{ width: 16, height: 16, background: "#F59E0B", borderRadius: 4 }} />
                  <span style={{ width: 16, height: 16, background: "#10B981", borderRadius: 4 }} />
                  <span style={{ width: 16, height: 16, background: "#3B82F6", borderRadius: 4 }} />
                </div>
                <div style={{ fontFamily: "Inter", fontSize: 15, fontWeight: 600, color: "#1F2937" }}>Docked Window Interface on Interview Tab</div>
              </div>
              <div style={{ padding: 6 }}>
                <Image src="/window.svg" alt="Docked Window" width={340} height={102} className="w-full h-auto" />
              </div>
              <div style={{ textAlign: "right", fontFamily: "Inter", fontSize: 12, fontWeight: 500, color: "#6B7280", fontStyle: "italic", paddingTop: 4 }}>Interview Tab Preview</div>
            </div>

            <div style={{ width: "100%", backgroundColor: "#FFFFFF", border: "1px solid #E5E7EB", borderRadius: 14, padding: 14, boxShadow: "0 4px 16px rgba(0,0,0,0.06)" }}>
              <div style={{ display: "flex", alignItems: "center", marginBottom: 12 }}>
                <div style={{ fontFamily: "Inter", fontSize: 15, fontWeight: 600, color: "#1F2937" }}>Interview Performance Report Screen</div>
              </div>
              <div style={{ padding: 6 }}>
                <Image src="/window.svg" alt="Interview Performance Report" width={340} height={96} className="w-full h-auto" />
              </div>
              <div style={{ textAlign: "center", fontFamily: "Inter", fontSize: 12, fontWeight: 500, color: "#6B7280", fontStyle: "italic", paddingTop: 6 }}>Report Screen Preview</div>
            </div>
          </aside>
        </div>
      )}

      {/* User avatar badge */}
      <div style={{ position: "fixed", bottom: 32, left: 32, display: "flex", alignItems: "center", gap: 12, padding: "12px 20px", background: "#FFFFFF", border: "1px solid #E5E7EB", borderRadius: 100, boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
        <span style={{ width: 40, height: 40, borderRadius: "50%", background: "linear-gradient(135deg, #EC4899 0%, #8B5CF6 100%)", display: "flex", alignItems: "center", justifyContent: "center", color: "#FFFFFF", fontFamily: "Inter", fontSize: 16, fontWeight: 700 }}>BC</span>
        <span style={{ fontSize: 14, color: "#1F2937", fontWeight: 500 }}>Welcome!</span>
      </div>
    </main>
  );
}