"use client";

import { ArrowLeft, Palette } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


const themes=["Midnight 🌙","Ocean 🌊","Sunset 🌅","Minimal 🤍"];
export default function ThemesPage(){
    const router = useRouter();
    const [active,setActive] = useState("Midnight 🌙");
    useEffect(() => {
        const savedTheme = localStorage.getItem("selectedTheme");
        if(savedTheme){
            setActive(savedTheme);
        }
    },[]);
    
    const selectTheme=(theme:string) => {
        setActive(theme);
        localStorage.setItem("selectedTheme",theme);
    };
    
    return (
    <main className="min-h-screen bg-[#020617] text-white p-8">
        <button onClick={() => router.back()} className="flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2 mb-8 hover:bg-white/20">
            <ArrowLeft size={18}/>Back</button>
            
            <div className="flex items-center gap-3">
                <Palette className="text-indigo-400"/>
                <h1 className="text-4xl font-black">Themes 🎨</h1>
                </div>
                
            <div className="grid md:grid-cols-4 gap-5 mt-10">
                {themes.map(theme => (
                    <button key={theme} onClick={() => selectTheme(theme)} className={`rounded-3xl border p-8
                        text-left transition hover:scale-105 ${active===theme ? "border-indigo-500 bg-indigo-600"
                            : "border-white/10 bg-white/5"}`}>
                                
                                <h2 className="text-xl font-bold">{theme}</h2>
                                <p className="text-slate-300 mt-3">Beautiful form appearance</p>
                                </button>
                                ))
                        }
                        
                    </div>
                    
                <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-8">
                <h2 className="text-2xl font-bold">Selected Theme</h2>
                <p className="text-indigo-400 mt-3 text-xl">{active}</p>
                <p className="text-slate-400 mt-3">Theme saved successfully 🚀</p>
            </div>
        </main>
        );
    
    }