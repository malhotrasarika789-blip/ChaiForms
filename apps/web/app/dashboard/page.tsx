"use client";

import {
  FileText,
  Users,
  Eye,
  BarChart3,
  Plus,
  Edit,
  Share2,
  Download,
  Code2,
  Palette,
  Sparkles,
  Trash2,
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
  responses:any[];
  questions:any[];
  status?:string;
  views?:number;

};

export default function DashboardPage(){
  const router = useRouter();
  const [forms,setForms] = useState<FormType[]>([]);

  useEffect(()=>{
    const saved = JSON.parse(localStorage.getItem("forms") || "[]");
    setForms(saved);
  },[]);
  
  const stats = [
    {
      title:"Total Forms",
      value:forms.length,
      icon:FileText,
    },
    {
      title:"Published Forms",
      value:forms.filter(f=>f.status==="Published" || f.visibility==="Public").length,
      icon:Sparkles,
    },
    {
      title:"Total Responses",
      value:forms.reduce((acc,f)=>acc+(f.responses?.length || 0),0),
      icon:Users,
    },
    {
      title:"Total Views",
      value:forms.reduce((acc,f)=>acc+(f.views || 0),0),
      icon:Eye,
    },
  ];
  
  const deleteForm = (id:number) => {
    const updated = forms.filter(form=>form.id!==id);
    setForms(updated);
    localStorage.setItem("forms",JSON.stringify(updated));
  };
  
  const exportCSV = (form:FormType) => {
    let csv="Question,Answer\n";
    form.responses?.forEach((response:any) => {
      csv += `${response.question || ""},${response.answer || ""}\n`;
    });
    const blob = new Blob([csv],
      {type:"text/csv"}
    );
    
    const url = URL.createObjectURL(blob);
    const link=document.createElement("a");
    link.href=url;
    link.download=`${form.title}-responses.csv`;
    link.click();
  };
  const exportAllCSV = () => {
    let csv = "Form,Responses\n";
    forms.forEach((form)=>{csv += `${form.title},${form.responses?.length || 0}\n`;});
    const blob = new Blob([csv],{type:"text/csv"});
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download="all-forms-responses.csv";
    link.click();
  };
  const templates=["Movie Review 🎬","Gaming Survey 🎮","Developer Feedback 💻","Startup Research 🚀","Community Event 🎉",];
  return (
  <main className="min-h-screen bg-[#020617] text-white p-6">
    <div className="flex flex-col md:flex-row justify-between gap-4">
      <div>
        <h1 className="text-4xl font-bold">Welcome back 👋</h1>
        <p className="text-slate-400 mt-2">Create beautiful forms and collect responses.</p>
        </div>
        
        <Link href="/dashboard/create" className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 hover:bg-indigo-500">
        <Plus size={18}/>Create New Form</Link>
        </div>
        
        <section className="grid grid-cols-1 md:grid-cols-4 gap-5 mt-10">
          {stats.map((item) => (
            <div key={item.title} className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
              <item.icon className="text-indigo-400 mb-4"/>
              <p className="text-slate-400">{item.title}</p>
              <h2 className="text-3xl font-bold mt-2">{item.value}</h2>
              </div>
            ))
            }
          </section>
          <section className="mt-12">
            
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">My Forms</h2>
              <div className="flex gap-4">
                <Link href="/dashboard/explore"  className="text-indigo-400">Explore</Link>
                <Link href="/dashboard/forms"  className="text-indigo-400">View All</Link>
                </div>
                </div>
              
            <div className="grid md:grid-cols-3 gap-5 mt-5">
              {forms.length===0 ?
              <div className="col-span-3 rounded-2xl border border-white/10 bg-white/5 p-10 text-center text-slate-400">
                No Forms Created Yet 🚀
                </div>
                : forms.map((form) => (
                <div key={form.id} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                  <h3 className="text-xl font-semibold">{form.title}</h3>
                  <p className="text-slate-400 mt-2">{form.description}</p>

                  <div className="mt-4 space-y-2 text-sm">
                    <p>Status:<span className="text-green-400 ml-2">{form.status || "Published"}</span></p>
                    <p>Visibility:<span className="text-indigo-400 ml-2">{form.visibility}</span></p>
                    <p>Responses:<span className="ml-2">{form.responses?.length || 0}</span></p>
                    <p>Views:<span className="ml-2">{form.views || 0}</span></p>
                    </div>
                    
                  <div className="flex gap-3 mt-6">
                    <Link href={`/dashboard/edit/${form.id}`} className="p-2 rounded-lg bg-white/10 hover:bg-indigo-600">
                    <Edit size={16}/>
                    </Link>
                    
                    <button onClick={() => {navigator.clipboard.writeText(window.location.origin+"/form/"+form.id);
                    alert("Form link copied 🔗");
                  }}className="p-2 rounded-lg bg-white/10 hover:bg-indigo-600">
                    
                    <Share2 size={16}/>
                    </button>
                    
                    <button onClick={()=>exportCSV(form)} className="p-2 rounded-lg bg-white/10 hover:bg-indigo-600">
                      <Download size={16}/>
                      </button>
                      
                      <button onClick={()=>deleteForm(form.id)} className="p-2 rounded-lg bg-red-500/20 text-red-400">
                        <Trash2 size={16}/>
                        </button>
                      </div>
                  </div>
                  
              ))
              
            }
          </div>
          </section>
          <section className="mt-12 grid md:grid-cols-3 gap-5">
            <div className="md:col-span-2 rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="flex items-center gap-3">
              <BarChart3 className="text-indigo-400"/>
              <h2 className="text-2xl font-bold">Response Analytics</h2>
              </div>
              <div className="h-48 flex items-end gap-5 mt-10">
                {[40,70,50,90,60,100].map((height,index)=>(
                  <div key={index} className="bg-indigo-500 rounded-t-xl w-10" style={{height:`${height}%`}}/>
                ))
                }
                
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-xl font-bold">Quick Actions</h2>
            <div className="mt-5 space-y-3">
              <button onClick={exportAllCSV} className="flex gap-3 items-center w-full rounded-xl bg-white/10 p-3 hover:bg-indigo-600">
              <Download size={18}/>Export CSV</button>
              
              <button onClick={() => router.push("/dashboard/api-docs")} className="flex gap-3 items-center w-full rounded-xl bg-white/10 p-3 hover:bg-indigo-600">
                <Code2 size={18}/>
                API Docs
                </button>
                <button onClick={()=>router.push("/dashboard/themes")} className="flex gap-3 items-center w-full rounded-xl bg-white/10 p-3 hover:bg-indigo-600">
                  <Palette size={18}/>
                  Themes
                  </button>
                </div>
              </div>
              </section>
              
            <section className="mt-12">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Explore Templates</h2>
                <Link href="/dashboard/explore" className="text-indigo-400 hover:text-indigo-300">
                View All
                </Link>
                </div>
                
                <div className="grid md:grid-cols-5 gap-4 mt-5">
                  {templates.map(temp => (
                    <div key={temp} className="rounded-xl border border-white/10 bg-white/5 p-5 hover:border-indigo-500 cursor-pointer">
                      {temp}
                      </div>
                    ))}
                    </div>
                    </section>
          </main>
        );
      }