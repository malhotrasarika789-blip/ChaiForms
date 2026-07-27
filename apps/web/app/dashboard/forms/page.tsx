"use client";

import {
  ArrowLeft,
  Edit,
  Share2,
  Trash2,
  Download
} from "lucide-react";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type FormType = {
  id:number;
  title:string;
  description:string;
  visibility:string;
  theme:string;
  questions:any[];
  responses:any[];
  status?:string;
};



export default function FormsPage(){
    const router = useRouter();
    const [forms,setForms] = useState<FormType[]>([]);
    useEffect(()=>{
        const saved = JSON.parse(localStorage.getItem("forms") || "[]");
        setForms(saved);
    },[]);
    
    const deleteForm=(id:number)=>{
        const updated = forms.filter((form)=>form.id!==id);
        setForms(updated);
        localStorage.setItem("forms",JSON.stringify(updated));
    };
    const exportCSV=(form:FormType)=>{
        let csv = "Question,Answer\n";
        form.responses?.forEach((res:any)=>{
            csv += `${res.question || ""},${res.answer || ""}\n`;
        });
        
        const blob = new Blob([csv],{type:"text/csv"});
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href=url;
        link.download =`${form.title}-responses.csv`;
        link.click();
    };
    
    return (

<main className="min-h-screen bg-[#020617] text-white p-8">
    <div className="flex justify-between items-center mb-8">
        <div>
            <button onClick={()=>router.back()} className="flex items-center gap-2 text-slate-400 hover:text-white mb-5">
                <ArrowLeft size={18}/>
                Back
                </button>
                
                <h1 className="text-4xl font-black">All Forms 🚀</h1>
                <p className="text-slate-400 mt-2">Manage all your created forms</p>
                </div>
                <Link href="/dashboard/create" className="rounded-xl bg-indigo-600 px-5 py-3 hover:bg-indigo-500">
                + Create Form
                </Link>
                
            </div>
            {forms.length===0 ?
            <div className="rounded-3xl border border-white/10 bg-white/5 p-10 text-center">
                <h2 className="text-2xl font-bold">No Forms Created Yet 🚀</h2>
                <p className="text-slate-400 mt-2">Create your first form</p>
                </div>
                :
                <div className="grid md:grid-cols-3 gap-6">
                    {forms.map((form)=>(
                        <div key={form.id} className="rounded-3xl border border-white/10 bg-white/5 p-6">
                            <h2 className="text-xl font-bold">{form.title}</h2>
                            <p className="text-slate-400 mt-2">{form.description}</p>
                            <div className="mt-5 space-y-2 text-sm">
                                <p>Status:<span className="text-green-400 ml-2">{form.status || "Published"}</span></p>
                                <p>Visibility:<span className="text-indigo-400 ml-2">{form.visibility}</span></p>
                                <p>Questions:<span className="ml-2">{form.questions?.length || 0}</span></p>
                                <p>Responses:<span className="ml-2">{form.responses?.length || 0}</span></p>
                                </div>
                                
                                <div className="flex gap-3 mt-6">
                                    <Link href={`/dashboard/edit/${form.id}`} className="p-3 rounded-xl bg-white/10 hover:bg-indigo-600">
                                    <Edit size={18}/>
                                    </Link>
                                    
                                    <button onClick={()=>{
                                    navigator.clipboard.writeText(window.location.origin+
                                        "/form/"+form.id
                                    );
                                    alert("Public form link copied 🔗");
                                }}

className="p-3 rounded-xl bg-white/10 hover:bg-white/20"

>

<Share2 size={18}/>

</button>








{/* CSV */}



<button

onClick={()=>exportCSV(form)}

className="p-3 rounded-xl bg-white/10 hover:bg-green-600"

>

<Download size={18}/>

</button>








{/* DELETE */}



<button

onClick={()=>deleteForm(form.id)}

className="p-3 rounded-xl bg-red-500/20 text-red-400 hover:bg-red-500/40"

>

<Trash2 size={18}/>

</button>






</div>





</div>



))


}



</div>



}





</main>

);


}