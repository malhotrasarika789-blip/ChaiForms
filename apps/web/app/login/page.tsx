"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {

  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });


  return (
    <main className="relative min-h-screen overflow-hidden bg-[#020617] text-white">

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#4f46e520,transparent_45%)]" />


      <div className="relative mx-auto flex min-h-screen max-w-7xl items-center justify-between px-6 lg:px-12">


        {/* LEFT */}

        <motion.div
          initial={{opacity:0,x:-60}}
          animate={{opacity:1,x:0}}
          transition={{duration:.7}}
          className="hidden w-1/2 lg:block"
        >

          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-2 text-indigo-300">

            <Sparkles className="h-4 w-4"/>

            Welcome Back to ChaiForms

          </div>


          <h1 className="mt-8 text-6xl font-black leading-tight">

            Build

            <span className="block bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">

              Amazing Forms

            </span>

          </h1>


          <p className="mt-6 max-w-xl text-lg text-slate-400">

            Manage your forms, collect responses and track
            analytics from one powerful dashboard.

          </p>


          <div className="mt-8 space-y-3 text-slate-300">

            <p>✔ Create unlimited forms</p>
            <p>✔ View live responses</p>
            <p>✔ Customize themes</p>
            <p>✔ Analytics dashboard</p>

          </div>


        </motion.div>



        {/* RIGHT */}

        <motion.div
          initial={{opacity:0,y:40}}
          animate={{opacity:1,y:0}}
          transition={{duration:.7}}
          className="mx-auto w-full max-w-md"
        >


          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-2xl shadow-[0_0_60px_rgba(79,70,229,.25)]">


            <div className="text-center">

              <h2 className="text-3xl font-bold">
                Login
              </h2>


              <p className="mt-2 text-sm text-slate-400">
                Welcome back! Login to continue.
              </p>

            </div>



            <form className="mt-6 space-y-4">


              <div>

                <label className="text-sm text-slate-300">
                  Email Address
                </label>


                <input
                  type="email"
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={(e)=>setForm({
                    ...form,
                    email:e.target.value
                  })}
                  className="mt-1 h-10 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-white outline-none focus:border-indigo-500"
                />

              </div>



              <div>

                <label className="text-sm text-slate-300">
                  Password
                </label>


                <input
                  type="password"
                  placeholder="Enter password"
                  value={form.password}
                  onChange={(e)=>setForm({
                    ...form,
                    password:e.target.value
                  })}
                  className="mt-1 h-10 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-white outline-none focus:border-indigo-500"/>
              </div>

              <button type="submit" onClick={(e) => {
                e.preventDefault();
                alert("Login successful 🎉");
                router.push("/dashboard");
                }}className="h-10 w-full rounded-xl bg-indigo-600 font-semibold hover:bg-indigo-500">Login</button>
            </form>
            <p className="mt-6 text-center text-sm text-slate-400">
              Don't have an account?{" "}
              <Link href="/signup" className="font-semibold text-indigo-400 hover:text-indigo-300">
                Create Account
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </main>
  );
}