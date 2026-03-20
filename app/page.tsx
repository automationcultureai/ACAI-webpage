"use client";

import AnimatedGradientBackground from "@/components/ui/animated-gradient-background";
import { useState } from "react";


export default function Home() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!email) return;
  setLoading(true);

  await fetch("https://formspree.io/f/mvzwleja", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  setSubmitted(true);
  setLoading(false);
};

  return (
    <main className="relative w-full h-screen overflow-hidden bg-black">
      <AnimatedGradientBackground
        Breathing={true}
        gradientColors={[
          "#0A0A0A",
          "#001233",
          "#023e8a",
          "#0077b6",
          "#00b4d8",
          "#90e0ef",
          "#0A0A0A",
        ]}
        gradientStops={[30, 42, 52, 62, 72, 85, 100]}
        animationSpeed={0.015}
        breathingRange={6}
        startingGap={130}
      />

      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center gap-6">

        {/* Hero */}
        <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight">
          Automation Culture<span className="text-blue-400">.AI</span>
        </h1>

        <p className="text-white/50 text-lg max-w-sm">
          We automate the gruntwork. <br /> You take care of business.
        </p>

        {/* Waitlist form */}
        {submitted ? (
          <p className="text-violet-300 text-sm mt-2">
            You&apos;re on the list — we&apos;ll be in touch.
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 w-full max-w-sm mt-2"
          >
            <input
              type="email"
              required
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 backdrop-blur-sm outline-none focus:border-blue-500 transition"
            />
            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-50 px-6 py-3 text-sm font-semibold text-white transition"
            >
              {loading ? "..." : "Join Waitlist"}
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
