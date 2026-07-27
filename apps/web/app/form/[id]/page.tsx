"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowLeft, CheckCircle } from "lucide-react";

export default function PublicFormPage(){
    const params = useParams();
    const router = useRouter();
    const id = Number(params.id);
    
    const [form,setForm] = useState<any>(null);
    const [answers,setAnswers] = useState<any>({});
    const [submitted,setSubmitted] = useState(false);
    const [theme,setTheme] = useState("Midnight 🌙");
    
    useEffect(() => {
    const viewedKey = `viewed_${id}`;
    if(sessionStorage.getItem(viewedKey)){
        return;
    }

    sessionStorage.setItem(viewedKey, "true");
    const saved = JSON.parse(localStorage.getItem("forms") || "[]");
    const current = saved.find((f:any)=>f.id===id);

    if(current){
        const updated = saved.map((f:any)=>{
            if(f.id === id){
                return {
                    ...f,
                    views:(f.views || 0) + 1
                };
            }
            return f;
        });

        localStorage.setItem("forms",JSON.stringify(updated));
        setForm({
            ...current,
            views:(current.views || 0)+1
        });
    }

    if(current?.theme){
        setTheme(current.theme);
    }},[id]);
    
        const themeClass = theme.includes("Ocean") ? "bg-blue-950" : theme.includes("Sunset") ?
        "bg-orange-950" : theme.includes("Minimal") ? "bg-slate-900" : "bg-[#020617]";
        
        const submitForm = () => {
            const saved = JSON.parse(localStorage.getItem("forms") || "[]");
            const updated = saved.map((f:any) => {
                if(f.id===id){
                    return {...f,
                        responses:[...(f.responses || []),{
                            answers,
                            submittedAt:new Date().toISOString()
                        }
                    ]
                };
            }
            return f;
        });
        localStorage.setItem("forms",JSON.stringify(updated));
        setSubmitted(true);
    };
    if(!form){
        return (
        <main className={`min-h-screen ${themeClass} text-white flex items-center justify-center`}>
            <h1 className="text-2xl font-bold">Form not found ❌</h1>
            </main>
            );
    }
    
    return (
    <main className={`min-h-screen ${themeClass} text-white p-8 flex justify-center`}>
        <div className="w-full max-w-2xl">
            <button onClick={()=>router.back()} className="mb-6 flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2 hover:bg-white/20">
                <ArrowLeft size={18}/>Back</button>
                
                {submitted ?
                <div className="rounded-3xl border border-white/10 bg-white/5 p-10 text-center">
                    <CheckCircle size={60} className="mx-auto text-green-400"/>
                    <h1 className="text-3xl font-black mt-5">Thank You 🎉</h1>
                    <p className="text-slate-400 mt-3">Your response has been submitted successfully.</p></div>
                    : <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
                        <h1 className="text-4xl font-black">{form.title}</h1>
                        <p className="text-slate-400 mt-3">{form.description}</p>
                        <div className="mt-8 space-y-6">
                            
                            {form.questions?.map((q:any,index:number) => (
                                <div key={q.id} className="rounded-2xl bg-white/5 p-5">
                                    <label className="font-semibold">Q{index+1}. {q.title}</label>
                                    
                                {q.type==="Select" ? <select onChange={(e) => setAnswers({
                                    ...answers,
                                    [q.id]:e.target.value
                                })
                            }className="mt-3 w-full rounded-xl bg-[#0f172a] p-3">
                                <option>Choose option</option>
                                <option>Option 1</option>
                                <option>Option 2</option>
                            </select> : q.type==="Checkbox" ? <label className="mt-3 flex gap-2 items-center">
                                <input type="checkbox" onChange={(e) => setAnswers({
                                    ...answers,
                                    [q.id]:e.target.checked}
                                    )}/>
                                    Yes
                                    </label> :
                                    <textarea placeholder="Enter your answer..." onChange={(e)=>setAnswers({
                                        ...answers,[q.id]:e.target.value})
                                        }className="mt-3 w-full h-28 rounded-xl bg-white/10 p-3 outline-none"/>
                                        }
                                        </div>
                                        ))
                                }
                            </div>
                            
                        <button onClick={submitForm} className="mt-8 w-full rounded-xl bg-indigo-600 py-4 font-bold hover:bg-indigo-500">
                            Submit Response 🚀
                            </button>
                        </div>
                    }
                </div>
            </main>
            );
        }