"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function ExplorePage() {

  const [forms, setForms] = useState<any[]>([]);

  useEffect(() => {
    const saved = JSON.parse(
      localStorage.getItem("forms") || "[]"
    );

    const publicForms = saved.filter(
      (form:any) => form.visibility === "PUBLIC"
    );

    setForms(publicForms);

  }, []);


  return (
    <main className="min-h-screen bg-[#020617] text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold">
          Explore Forms 🚀
        </h1>

        <p className="text-slate-400 mt-2">
          Discover public forms created by users
        </p>


        <div className="grid md:grid-cols-3 gap-6 mt-10">
          {
          forms.length === 0 ?

          <div className="col-span-3 rounded-2xl border border-white/10 bg-white/5 p-10 text-center text-slate-400">
            No Public Forms Available
          </div>
          :

          forms.map((form)=>(
            
            <div key={form.id} className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:border-indigo-500 transition">

              <h2 className="text-xl font-semibold">
                {form.title}
              </h2>


              <p className="text-slate-400 mt-2">
                {form.description}
              </p>


              <div className="mt-4 text-sm">

                <p>
                  Views:
                  <span className="ml-2 text-indigo-400">
                    {form.views || 0}
                  </span>
                </p>


                <p>
                  Responses:
                  <span className="ml-2">
                    {form.responses?.length || 0}
                  </span>
                </p>

              </div>


              <Link href={`/form/${form.id}`} className="inline-block mt-5 bg-indigo-600 px-4 py-2 rounded-xl hover:bg-indigo-700">
                Open Form
              </Link>


            </div>

          ))

          }


        </div>

      </div>

    </main>
  );
}