"use client";

import {useEffect,useState} from "react";
import {useParams,useRouter} from "next/navigation";
import {motion} from "framer-motion";
import {
ArrowLeft,
Save,
Plus,
Trash2,
Sparkles,
Lock,
Globe2
} from "lucide-react";

export default function EditFormPage(){

const router=useRouter();
const params=useParams();
const id=Number(params.id);

const [form,setForm]=useState<any>(null);

const [title,setTitle]=useState("");
const [description,setDescription]=useState("");
const [visibility,setVisibility]=useState("PUBLIC");
const [questions,setQuestions]=useState<any[]>([]);

useEffect(() => {
    const saved=JSON.parse(localStorage.getItem("forms")||"[]");
    const current=saved.find((f:any)=>f.id===id);
    if(current){
        setForm(current);
        setTitle(current.title);
        setDescription(current.description);
        setVisibility(current.visibility);
        setQuestions(current.questions||[]);
    }
},[id]);
const updateQuestion = (index:number,value:string) => {
    setQuestions(prev=>prev.map((q,i)=>i===index ?{...q,title:value} :q));
};

const toggleRequired = (index:number) => {
    setQuestions(prev=>prev.map((q,i)=>i===index ?{...q,required:!q.required} :q));
};

const addQuestion=()=>{
    setQuestions(prev=>[
        ...prev,
        {
            id:Date.now(),
            type:"Short Text",
            title:"Untitled Question",
            required:true
        }
    ]);
};

const deleteQuestion=(id:number)=>{
    setQuestions(prev=>prev.filter(q=>q.id!==id));
};

const saveChanges=()=>{
    const saved=JSON.parse(localStorage.getItem("forms")||"[]");
    const updated=saved.map((f:any)=>{
        if(f.id===id){
            return{...f,title,description,visibility,questions};
        }
        
        return f;
    });
    localStorage.setItem("forms",JSON.stringify(updated));
    alert("Changes Saved Successfully ✅");
    router.push("/dashboard");
};
if(!form){
    return(
    <main className="min-h-screen bg-[#020617] flex items-center justify-center text-white">
        <h1 className="text-3xl font-bold">Form Not Found ❌</h1>
        </main>
        );
    }
    return(
    <main className="min-h-screen bg-[#020617] text-white p-8">
        <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-10">
                <div>
                    <h1 className="text-5xl font-black flex items-center gap-3">
                        <Sparkles className="text-indigo-400"/>Edit Form</h1>
                        <p className="text-slate-400 mt-3">Update your form beautifully and publish changes instantly.</p>
                        </div>
                        <div className="flex gap-4">
                            <button onClick={()=>router.back()} className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 transition-all duration-300 hover:bg-white/10 hover:scale-105">
                                <ArrowLeft size={18}/>Back</button>
                                <button onClick={saveChanges} className="flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-semibold transition-all duration-300 hover:bg-indigo-500 hover:scale-105 hover:shadow-xl hover:shadow-indigo-500/40">
                                <Save size={18}/>Save Changes</button>
                                </div>
                            </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        <motion.div initial={{x:-30,opacity:0}} animate={{x:0,opacity:1}} className="md:col-span-1">
                            <div className="sticky top-6 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 transition-all duration-300 hover:border-indigo-500 hover:shadow-2xl hover:shadow-indigo-500/20">
                            <h2 className="text-2xl font-bold">Form Details</h2>
                            <p className="mt-2 text-slate-400">Manage your form settings</p>
                            <div className="mt-8">
                                <p className="mb-2 text-sm text-slate-400">Form Title</p>
                                <input value={title} onChange={(e)=>setTitle(e.target.value)} className="w-full rounded-xl border border-white/10 bg-[#0f172a] p-3 outline-none transition-all duration-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"/>
                                </div>
                        <div className="mt-6">
                            <p className="mb-2 text-sm text-slate-400">Description</p>
                        <textarea rows={5} value={description} onChange={(e)=>setDescription(e.target.value)}
                        className="w-full rounded-xl border border-white/10 bg-[#0f172a] p-3 outline-none transition-all duration-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"/>
                        </div>
                    <div className="mt-6">
                        <p className="mb-3 text-sm text-slate-400">Visibility</p>
                        <div className="space-y-3">
                            <button onClick={()=>setVisibility("PUBLIC")} className={`w-full flex items-center justify-between rounded-xl p-3 transition-all duration-300 ${
                                visibility==="PUBLIC" ?"bg-indigo-600 text-white" :"bg-white/5 hover:bg-white/10"}`}>
                                    <div className="flex items-center gap-3">
                                        <Globe2 size={18}/>
                                        <span>Public</span>
                                        </div>
                                        </button>
                                        
                        <button onClick={()=>setVisibility("UNLISTED")} className={`w-full flex items-center justify-between rounded-xl p-3 transition-all duration-300 ${
                        visibility==="UNLISTED" ?"bg-indigo-600 text-white" :"bg-white/5 hover:bg-white/10"}`}>
                            <div className="flex items-center gap-3">
                                <Lock size={18}/>
                                <span>Unlisted</span>
                                </div>
                            </button>
                            </div>
                            </div>
                            </div>
                        </motion.div>
                        
                    <motion.div initial={{x:30,opacity:0}} animate={{x:0,opacity:1}} className="md:col-span-2 space-y-6">
                        {questions.map((q,index)=>(
                            <div key={q.id} className="group rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 transition-all duration-300 hover:border-indigo-500 hover:shadow-xl hover:shadow-indigo-500/20 hover:-translate-y-1">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-xl font-bold">Question {index+1}</h3>
                                    <button onClick={()=>deleteQuestion(q.id)} className="rounded-xl bg-red-500/20 p-2 text-red-400 transition-all duration-300 hover:bg-red-500 hover:text-white hover:scale-110">
                                        <Trash2 size={18}/>
                                        </button>
                                    </div>
                                    <p className="mt-2 text-xs text-indigo-400">{q.type}</p>
                                <input value={q.title} onChange={(e)=>updateQuestion(index,e.target.value)} className="mt-5 w-full rounded-xl border border-white/10 bg-[#0f172a] p-3 outline-none transition-all duration-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"/>
                                <label className="mt-5 flex items-center gap-3 cursor-pointer">
                                <input type="checkbox" checked={q.required} onChange={()=>toggleRequired(index)} className="h-4 w-4 accent-indigo-600"/>
                                <span className="text-sm">Required Field</span>
                            </label>
                        </div>
                ))}
                <button onClick={addQuestion} className="w-full rounded-2xl border-2 border-dashed border-indigo-500 p-5 text-indigo-400 transition-all duration-300 hover:bg-indigo-600 hover:text-white hover:scale-[1.02]">
                    <div className="flex items-center justify-center gap-2">
                        <Plus size={20}/>Add New Question</div>
                        </button>
                    </motion.div>
                </div>
                <motion.div initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{delay:0.3}} 
                className="mt-12 rounded-3xl border border-white/10 bg-gradient-to-r from-indigo-600/20 via-slate-900 to-purple-600/20 p-8 backdrop-blur-xl">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div>
                            <h2 className="text-3xl font-black">Ready to Publish? 🚀</h2>
                            <p className="mt-2 text-slate-300">
                                Review your changes before saving. Your users will instantly see the latest version.
                                </p>
                            </div>
                            <div className="flex gap-4">
                                <button onClick={()=>router.back()} className="rounded-xl border border-white/10 bg-white/5 px-6 py-3 transition-all duration-300 hover:bg-white/10 hover:scale-105">
                                    Cancel
                                    </button>
                                    <button onClick={saveChanges} className="rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-3 font-bold transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-indigo-500/40">
                                    Save Form ✅
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                    </main>
);

}
