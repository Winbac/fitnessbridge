"use client";

import { ArrowRight, Dumbbell, Eye, Lock, Mail, Zap } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (email === "admin@fitnessbridge.com" && password === "admin123") {
      localStorage.setItem("fitness_admin_auth", "true");
      router.push("/admin");
    } else {
      alert("Invalid email or password");
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0F172A] p-6">
      <div className="relative w-full max-w-6xl overflow-hidden rounded-3xl bg-[#111827] shadow-2xl">
        <div className="absolute left-0 top-0 h-[3px] w-full overflow-hidden bg-[#1F2937]">
          <div className="h-full w-1/3 animate-[slideLine_2s_linear_infinite] bg-gradient-to-r from-[#F97316] via-[#FACC15] to-[#EA580C]" />
        </div>

        <div className="grid min-h-[680px] grid-cols-1 lg:grid-cols-[0.75fr_1.1fr]">
          <section className="relative hidden overflow-hidden bg-[#0B0F1A] p-10 lg:block">
            <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(45deg,#F97316_1px,transparent_1px)] [background-size:28px_28px]" />
            <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full border border-[#F97316]/30" />
            <div className="relative z-10 flex h-full flex-col justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F97316] text-white">
                  <Dumbbell size={26} />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">GymBridge</h1>
                  <p className="text-sm text-[#9CA3AF]">Admin Portal</p>
                </div>
              </div>

              <div className="text-center">
                <div className="mx-auto mb-10 flex h-28 w-28 items-center justify-center rounded-full border border-[#F97316]/40 bg-[#F97316]/15 text-[#F97316]">
                  <Zap size={48} />
                </div>

                <h2 className="text-4xl font-extrabold text-white">
                  Welcome Back!
                </h2>
                <p className="mx-auto mt-6 max-w-xs text-lg leading-8 text-[#9CA3AF]">
                  Sign in to manage your gym platform and track your members.
                </p>
              </div>

              <div className="text-center">
                <p className="mb-4 text-[#9CA3AF]">Don&apos;t have an account?</p>
                <button className="rounded-full border border-[#F97316] px-8 py-3 font-semibold text-[#F97316]">
                  Create Account
                </button>
              </div>
            </div>
          </section>

          <section className="flex items-center justify-center p-8 md:p-14">
            <div className="w-full max-w-xl">
              <h2 className="text-3xl font-extrabold text-white">Sign In</h2>
              <p className="mt-3 text-[#9CA3AF]">
                Enter your credentials to access the dashboard.
              </p>

              <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <button className="rounded-xl border border-[#1F2937] bg-[#171923] px-6 py-4 font-semibold text-white">
                  Google
                </button>
                <button className="rounded-xl border border-[#1F2937] bg-[#171923] px-6 py-4 font-semibold text-white">
                  Facebook
                </button>
              </div>

              <div className="my-8 flex items-center gap-4 text-[#9CA3AF]">
                <div className="h-px flex-1 bg-[#1F2937]" />
                <span>or continue with email</span>
                <div className="h-px flex-1 bg-[#1F2937]" />
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="flex items-center gap-4 rounded-2xl border border-[#1F2937] bg-[#171923] px-5 py-4 text-[#9CA3AF]">
                  <Mail size={20} />
                  <input
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent text-white outline-none"
                    required
                  />
                </div>

                <div className="flex items-center gap-4 rounded-2xl border border-[#1F2937] bg-[#171923] px-5 py-4 text-[#9CA3AF]">
                  <Lock size={20} />
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-transparent text-white outline-none"
                    required
                  />
                  <Eye size={20} />
                </div>

                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 text-[#9CA3AF]">
                    <input type="checkbox" />
                    Remember me
                  </label>

                  <button type="button" className="font-semibold text-[#F97316]">
                    Forgot password?
                  </button>
                </div>

                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-3 rounded-2xl bg-[#F97316] px-6 py-4 text-lg font-bold text-white hover:bg-[#EA580C]"
                >
                  Sign In
                  <ArrowRight size={22} />
                </button>
              </form>

              <p className="mt-6 text-sm text-[#9CA3AF]">
                Test login: admin@fitnessbridge.com / admin123
              </p>
            </div>
          </section>
        </div>
      </div>

      <style jsx global>{`
        @keyframes slideLine {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(300%);
          }
        }
      `}</style>
    </main>
  );
}