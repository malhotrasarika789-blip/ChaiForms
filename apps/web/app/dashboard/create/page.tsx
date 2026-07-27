"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Plus, Eye, Rocket, Palette, Settings } from "lucide-react";

const fields = ["Short Text","Email","Number","Select","Checkbox","Rating","Date",];
const themes = ["Midnight 🌙","Ocean 🌊","Sunset 🌅","Minimal 🤍",];

export default function CreateFormPage(){
    const router = useRouter();
    useEffect(() => {
        const savedTheme = localStorage.getItem("selectedTheme");
        if(savedTheme){
            setTheme(savedTheme);}},[]);

    const [formTitle,setFormTitle] = useState("");
    const [description,setDescription] = useState("");
    const [visibility,setVisibility] = useState("PUBLIC");
    const [theme,setTheme] = useState("Midnight");
    const [showTheme,setShowTheme] = useState(false);
    const [responseLimit,setResponseLimit] = useState("Unlimited");
    
    const [questions,setQuestions] = useState([
        {
            id:1,
            type:"Short Text",
            title:"Untitled Question",
            required:true
        }
    ]);
    
    const addField = (type:string) => {
        setQuestions(prev => [...prev,{id:Date.now(),type,
            title:"Untitled Question",
            required:true
        }
    ]);
};

const updateQuestion = (index:number,value:string) => {
    setQuestions(prev => prev.map((q,i) => i===index ? {...q,title:value} : q)
);
};

const toggleRequired = (index:number) => {
    setQuestions(prev =>
        prev.map((q,i) => i===index ? {...q,required:!q.required} : q)
    );
};

const publishForm = () => {
    const formData = {
        id:Date.now(),
        title:formTitle,
        description,
        visibility,
        theme,
        responseLimit,
        status:"Published",
        views:0,
        responses:[],
        questions,
        createdAt:new Date().toISOString()
    };
    
    const oldForms = JSON.parse(localStorage.getItem("forms") || "[]");
    localStorage.setItem("forms",JSON.stringify([...oldForms,formData]));
    alert("Form Published Successfully 🚀");
    router.push("/dashboard");
};

const previewForm = () => {
    if(!formTitle.trim()){
  alert("Please enter form title");
  return;
}

const formData = {
    id: Date.now(),
    title: formTitle,
    description,
    visibility,
    theme,
    responseLimit,
    status:"Published",
    views:0,
    responses:[],
    questions,
    createdAt:new Date().toISOString()
};
    localStorage.setItem("previewForm",JSON.stringify(formData));
    router.push("/forms/preview");
};

return (
    <main className={`min-h-screen text-white p-8 ${theme.includes("Ocean") ? "bg-blue-950" : theme.includes("Sunset")
        ? "bg-orange-950" : theme.includes("Minimal") ? "bg-slate-900" : "bg-[#020617]"}`}>
    <div className="mb-8 flex justify-between items-center">
    <div>
        <h1 className="text-4xl font-black">New Form 🚀</h1>
        <p className="mt-2 text-slate-400">Design beautiful forms and collect responses</p>
        </div>
        
    <div className="flex gap-4">
        <button onClick={previewForm} className="flex items-center gap-2 rounded-xl bg-white/10 px-5 py-3 hover:bg-white/20">
        <Eye size={18}/>
        Preview
        </button>
    <button onClick={publishForm} className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 hover:bg-indigo-500">
        <Rocket size={18}/>
        Publish
        </button>
    </div>
</div>

<div className="flex gap-6 items-start">
    <motion.div initial={{x:-40,opacity:0}} animate={{x:0,opacity:1}} className="w-1/4">
    <div className="sticky top-6 rounded-3xl border border-white/10 bg-white/5 p-6">
    <h2 className="text-xl font-bold">Add Fields</h2>
    <p className="mt-2 mb-5 text-slate-400">Choose question type</p>
    {fields.map(field => (
        <button key={field} onClick={() => addField(field)} className="mb-3 flex w-full justify-between items-center rounded-xl border border-white/10 bg-white/5 px-4 py-3 hover:bg-indigo-600">
            {field}
            <Plus size={18}/>
        </button>
))
}
</div>
</motion.div>

<motion.div initial={{y:30,opacity:0}} animate={{y:0,opacity:1}} className="w-2/4 space-y-5">
<div className="rounded-3xl border border-white/10 bg-white/5 p-8">
<input placeholder="Untitled Form" value={formTitle} onChange={(e) => setFormTitle(e.target.value)}
className="w-full bg-transparent text-3xl font-bold outline-none"/>

<textarea placeholder="Form description..." value={description} onChange={(e)=>setDescription(e.target.value)} 
className="mt-5 h-28 w-full rounded-xl bg-white/10 p-4 outline-none"/>

</div>

{questions.map((q,index) => (
    <div key={q.id} className="rounded-3xl border border-white/10 bg-white/5 p-6">
        <div className="flex justify-between">
            <h3 className="font-bold">Q{index+1}</h3>
            <span className="text-indigo-400">{q.type}</span>
            </div>
            
            <input value={q.title} onChange={(e) => updateQuestion(index,e.target.value)}
            className="mt-5 w-full rounded-xl bg-white/10 p-3 outline-none"/>
            <label className="mt-5 flex gap-2 items-center">
                <input type="checkbox" checked={q.required} onChange={() => toggleRequired(index)}/>
                Required
                </label>
                </div>
        ))
        }
        </motion.div>
        <motion.div initial={{x:40,opacity:0}} animate={{x:0,opacity:1}} className="w-1/4">
        <div className="sticky top-6 rounded-3xl border border-white/10 bg-white/5 p-6">
        <h2 className="flex items-center gap-2 text-xl font-bold">
            <Settings/>Form Settings</h2>

            <div className="mt-8">
                <p className="mb-3 text-slate-300">Visibility</p>
                <select value={visibility} onChange={(e)=>setVisibility(e.target.value)} className="w-full rounded-xl bg-[#0f172a] p-3">
                    <option value="PUBLIC">Public</option>
                    <option value="UNLISTED">Unlisted</option>
                    </select>
                </div>

            <div className="mt-8">
                <p className="mb-3 text-slate-300">Theme</p>
                <button onClick={() => setShowTheme(!showTheme)} className="flex w-full justify-between rounded-xl bg-[#0f172a] p-3">
                    {theme}
                    <Palette/>
                </button>
                {showTheme && <div className="mt-3 space-y-2">
                    {themes.map(t => (<button key={t} onClick={() => {
                        setTheme(t); 
                        setShowTheme(false);}}className="w-full rounded-xl bg-indigo-600 p-3">
                            {t}
                        </button>
                    ))
                }
                </div>
                }
                </div>
                <div className="mt-8">
                    <p className="mb-3 text-slate-300">Response Limit</p>
                    <select value={responseLimit} onChange={(e)=>setResponseLimit(e.target.value)} className="w-full rounded-xl bg-[#0f172a] p-3">
                        <option>Unlimited</option>
                        <option>50 Responses</option>
                        <option>100 Responses</option>
                        <option>500 Responses</option>
                        <option>1000 Responses</option>
                    </select>
                </div>
            </div>
    </motion.div>
    </div>

</main>

);


}