"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

function formatTime(totalSeconds: number) {
  const m = Math.floor(totalSeconds / 60).toString().padStart(2, "0");
  const s = Math.floor(totalSeconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

export default function InterviewSessionPage() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Float32Array | null>(null);
  const meterIntervalRef = useRef<number | null>(null);
  const [kioskActive, setKioskActive] = useState(true);
  const violationHandledRef = useRef(false);

  const [permission, setPermission] = useState<"prompt" | "granted" | "denied">("prompt");
  const [cameraOn, setCameraOn] = useState(true);
  const [micOn, setMicOn] = useState(true);
  const [timer, setTimer] = useState(0);
  const [audioLevel, setAudioLevel] = useState(0); // 0–1 normalized

  useEffect(() => {
    // Attempt to enter full-screen and lock page interactions to kiosk mode
    const attemptFullscreen = async () => {
      try {
        // Hide scrollbars while in session
        document.documentElement.style.overflow = "hidden";
        document.body.style.overflow = "hidden";
        if (!document.fullscreenElement) {
          // Best effort: navigationUI hide if supported
          const opts: any = { navigationUI: "hide" };
          await (document.documentElement as any).requestFullscreen?.(opts);
        }
      } catch {}
    };

    // Treat Escape/F11 attempts as violations: immediately end interview and redirect
    const endInterviewAndRedirect = async () => {
      if (violationHandledRef.current) return;
      violationHandledRef.current = true;
      try {
        setKioskActive(false);
        if (document.fullscreenElement) {
          await document.exitFullscreen().catch(() => {});
        }
      } finally {
        document.documentElement.style.overflow = "auto";
        document.body.style.overflow = "auto";
        // Stop media tracks immediately
        try { streamRef.current?.getTracks().forEach((t) => t.stop()); } catch {}
        // Navigate to completion page (violation)
        window.location.href = "/ai-interview/completion";
      }
    };

    const keyHandler = (e: KeyboardEvent) => {
      if (!kioskActive) return;
      if (e.key === "Escape" || e.key === "F11") {
        e.preventDefault();
        e.stopPropagation();
        endInterviewAndRedirect();
      }
    };
    document.addEventListener("keydown", keyHandler, { capture: true });

    // If fullscreen gets exited by the browser (e.g., Escape), treat as violation
    const fsHandler = () => {
      if (!kioskActive) return;
      if (!document.fullscreenElement) {
        endInterviewAndRedirect();
      }
    };
    document.addEventListener("fullscreenchange", fsHandler);

    // End interview if tab becomes hidden (tab switch) or window loses focus (Alt+Tab)
    const visibilityHandler = () => {
      if (!kioskActive) return;
      if (document.visibilityState === "hidden") {
        endInterviewAndRedirect();
      }
    };
    const blurHandler = () => {
      if (!kioskActive) return;
      endInterviewAndRedirect();
    };
    document.addEventListener("visibilitychange", visibilityHandler);
    window.addEventListener("blur", blurHandler);

    // Re-apply overflow lock if resized
    const resizeHandler = () => {
      if (!kioskActive) return;
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    };
    window.addEventListener("resize", resizeHandler);

    // Attempt fullscreen on mount (may be rejected if no user gesture, but try)
    attemptFullscreen();

    let mounted = true;

    async function initMedia() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        if (!mounted) return;

        streamRef.current = stream;
        setPermission("granted");

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play().catch(() => {});
        }

        // Setup audio meter
        const ctx = new AudioContext();
        audioContextRef.current = ctx;
        const source = ctx.createMediaStreamSource(stream);
        const analyser = ctx.createAnalyser();
        analyser.fftSize = 256;
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Float32Array(bufferLength);
        analyserRef.current = analyser;
        dataArrayRef.current = dataArray;

        source.connect(analyser);

        meterIntervalRef.current = window.setInterval(() => {
          if (!analyserRef.current || !dataArrayRef.current) return;
          analyserRef.current.getFloatTimeDomainData(dataArrayRef.current);
          // Compute rough RMS
          let sumSquares = 0;
          for (let i = 0; i < dataArrayRef.current.length; i++) {
            const v = dataArrayRef.current[i]; // already in -1..1 range
            sumSquares += v * v;
          }
          const rms = Math.sqrt(sumSquares / dataArrayRef.current.length);
          setAudioLevel(Math.min(1, rms * 2));
        }, 100);

        // Start timer
        const interval = window.setInterval(() => setTimer((t) => t + 1), 1000);
        return () => {
          window.clearInterval(interval);
        };
      } catch (err) {
        console.error("getUserMedia error:", err);
        if (!mounted) return;
        setPermission("denied");
      }
    }

    initMedia();

    return () => {
      mounted = false;
      if (meterIntervalRef.current) window.clearInterval(meterIntervalRef.current);
      analyserRef.current?.disconnect();
      audioContextRef.current?.close().catch(() => {});
      streamRef.current?.getTracks().forEach((t) => t.stop());
      document.removeEventListener("keydown", keyHandler, { capture: true } as any);
      document.removeEventListener("fullscreenchange", fsHandler);
      document.removeEventListener("visibilitychange", visibilityHandler);
      window.removeEventListener("blur", blurHandler);
      window.removeEventListener("resize", resizeHandler);
      document.documentElement.style.overflow = "auto";
      document.body.style.overflow = "auto";
    };
  }, []);

  // Toggle camera
  function toggleCamera() {
    setCameraOn((on) => {
      const next = !on;
      const videoTrack = streamRef.current?.getVideoTracks()[0];
      if (videoTrack) videoTrack.enabled = next;
      return next;
    });
  }

  // Toggle microphone
  function toggleMic() {
    setMicOn((on) => {
      const next = !on;
      const audioTrack = streamRef.current?.getAudioTracks()[0];
      if (audioTrack) audioTrack.enabled = next;
      return next;
    });
  }

  // audioLevel currently used internally; UI meters removed per requirements

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-white shadow z-50 flex items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <Image src="/beyond-career-main-logo.png" alt="Beyond Career" width={140} height={28} priority />
          <div className="text-[#1F2937] font-semibold text-sm">Mock Interview - Software Engineer</div>
        </div>
        <div className="flex items-center gap-3">
          {/* Timer */}
          <div className="text-blue-600 bg-[#EEF2FF] px-4 py-2 rounded text-base font-semibold">
            {formatTime(timer)}
          </div>
          {/* Recording indicator */}
          <div className="flex items-center gap-2 text-red-500 font-medium">
            <span className="inline-block w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            Recording
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-gray-500 hover:text-blue-600 text-sm" title="Help & Support">Help</button>
          <button
            className="text-red-500 border border-red-500 rounded px-3 py-2 text-sm hover:bg-red-500 hover:text-white"
            onClick={async () => {
              // Graceful end (non-violation)
              try {
                setKioskActive(false);
                if (document.fullscreenElement) {
                  await document.exitFullscreen().catch(() => {});
                }
              } finally {
                document.documentElement.style.overflow = "auto";
                document.body.style.overflow = "auto";
              }
              window.location.href = "/ai-interview/completion";
            }}
          >
            End Interview
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="mt-16 mb-12 h-[calc(100vh-64px-48px)] grid grid-cols-[60%_40%] gap-6 p-6">
        {/* Left: Video */}
        <div className="relative bg-black rounded-2xl overflow-hidden shadow-lg">
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            className="w-full h-full object-cover"
            style={{ transform: "scaleX(-1)" }}
          />
          {/* Controls overlay: outlined white icons */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-md h-18 p-4 rounded-t-xl flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={toggleCamera}
              className={`w-12 h-12 rounded-full bg-white border ${cameraOn ? "border-emerald-500" : "border-gray-300"} shadow-sm flex items-center justify-center hover:bg-gray-50`}
              title="Camera"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="22"
                height="22"
                fill="none"
                className={cameraOn ? "stroke-emerald-600" : "stroke-gray-400"}
                strokeWidth="2"
              >
                <path d="M4 7h3l2-2h6l2 2h3a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2z" />
                <circle cx="12" cy="13" r="3" />
              </svg>
            </button>
            <button
              type="button"
              onClick={toggleMic}
              className={`w-12 h-12 rounded-full bg-white border ${micOn ? "border-emerald-500" : "border-gray-300"} shadow-sm flex items-center justify-center hover:bg-gray-50`}
              title="Mic"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="22"
                height="22"
                fill="none"
                className={micOn ? "stroke-emerald-600" : "stroke-gray-400"}
                strokeWidth="2"
              >
                <path d="M12 3a3 3 0 0 1 3 3v5a3 3 0 0 1-6 0V6a3 3 0 0 1 3-3z" />
                <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                <path d="M12 19v3" />
              </svg>
            </button>
          </div>
        </div>

        {/* Right: Interaction column */}
        <div className="flex flex-col gap-4 h-full">
          {/* Question card */}
          <section className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm min-h-[240px]">
            <div className="text-gray-500 text-sm font-semibold tracking-wide uppercase mb-4">CURRENT QUESTION</div>
            {/* Note: count removed per requirements */}
            <div className="text-[#1F2937] text-lg font-medium leading-relaxed mb-4">
              Tell me about a time when you had to work with a difficult team member. How did you handle the situation?
            </div>
            <div className="flex items-center gap-3 mt-4">
              <span className="px-3 py-1 bg-[#DBEAFE] text-[#1E40AF] rounded-2xl text-xs font-semibold">Behavioral</span>
              <div className="flex gap-1 items-center">
                {/* Difficulty dots */}
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    className={`inline-block w-2 h-2 rounded-full ${i < 3 ? "bg-amber-500" : "bg-gray-300"}`}
                  />
                ))}
              </div>
            </div>
            <div className="flex gap-4 mt-4">
              <button className="text-gray-600 text-sm hover:underline">Skip Question</button>
              <button className="text-blue-600 text-sm hover:underline">Ask for Clarification</button>
            </div>
          </section>

          {/* Transcript panel */}
          <section className="bg-[#F9FAFB] border border-gray-200 rounded-xl p-4 max-h-[280px] overflow-y-auto flex-1">
            <div className="flex items-center justify-between mb-3">
              <div className="text-[#1F2937] text-sm font-semibold">Live Transcript</div>
              <div className="flex items-center gap-2 text-emerald-500 text-xs font-medium">
                <span>Listening...</span>
                <span>🎤</span>
              </div>
            </div>
            {/* Example speech bubbles */}
            <div className="flex flex-col gap-2">
              <div className="self-end bg-[#EEF2FF] px-4 py-3 rounded-xl max-w-[90%]">
                <div className="text-[#6B7280] text-[11px] mb-1">00:14</div>
                <div className="text-[#1F2937] text-sm leading-relaxed">
                  I collaborated with a colleague who had strong opinions; we aligned on shared goals…
                </div>
              </div>
              <div className="opacity-70 text-blue-600 text-sm">Speaking… ▎</div>
            </div>
            <div className="text-[#6B7280] text-[11px] mt-2">Confidence: 94%</div>
          </section>

          {/* Feedback tip */}
          <section className="bg-[#FEF3C7] border border-[#FCD34D] rounded-xl p-4 flex items-start gap-3">
            <span className="text-amber-500 text-base">💡</span>
            <div>
              <div className="text-[#92400E] text-sm font-semibold mb-2">Quick Tip</div>
              <div className="text-[#78350F] text-[13px] leading-relaxed">
                Try to provide specific examples with measurable outcomes.
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Bottom status bar removed per requirements */}

      {/* Permission overlay */}
      {permission === "denied" && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[60]">
          <div className="bg-white rounded-xl p-6 w-[420px] text-center">
            <div className="text-[#1F2937] font-semibold text-base mb-2">Permission Required</div>
            <div className="text-[#6B7280] text-sm mb-4">
              Please allow camera and microphone access to start your mock interview.
            </div>
            <button
              className="bg-blue-600 text-white rounded px-4 py-2 text-sm"
              onClick={() => {
                setPermission("prompt");
                // Retry media request
                navigator.mediaDevices
                  .getUserMedia({ video: true, audio: true })
                  .then((stream) => {
                    streamRef.current = stream;
                    setPermission("granted");
                    if (videoRef.current) {
                      videoRef.current.srcObject = stream;
                      videoRef.current.play().catch(() => {});
                    }
                  })
                  .catch(() => setPermission("denied"));
              }}
            >
              Retry
            </button>
          </div>
        </div>
      )}
    </div>
  );
}