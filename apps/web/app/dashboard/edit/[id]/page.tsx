"use client";

import { ArrowLeft, Save } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export default function EditFormPage(){


const router = useRouter();

const params = useParams();

const id = Number(params.id);



const [form,setForm] = useState<any>(null);




useEffect(()=>{


const saved = JSON.parse(
localStorage.getItem("forms") || "[]"
);



const current = saved.find(
(f:any)=>f.id===id
);



setForm(current);



},[id]);







const saveChanges=()=>{


const saved = JSON.parse(
localStorage.getItem("forms") || "[]"
);



const updated = saved.map((f:any)=>

f.id===id
?
form
:
f

);



localStorage.setItem(
"forms",
JSON.stringify(updated)
);



alert("Form Updated Successfully 🚀");


router.push("/dashboard/forms");


};







if(!form){

return (

<div className="min-h-screen bg-[#020617] text-white p-10">

Loading...

</div>

);

}







return (


<main className="min-h-screen bg-[#020617] text-white p-8">





<button

onClick={()=>router.back()}

className="flex gap-2 items-center text-slate-400 mb-8"

>

<ArrowLeft size={18}/>

Back

</button>







<h1 className="text-4xl font-black mb-8">

Edit Form ✏️

</h1>







<div className="max-w-3xl rounded-3xl border border-white/10 bg-white/5 p-8">






<label className="text-slate-400">

Form Title

</label>


<input

value={form.title}

onChange={(e)=>setForm({

...form,

title:e.target.value

})}

className="mt-2 w-full rounded-xl bg-white/10 p-4 outline-none"

/>








<label className="block mt-6 text-slate-400">

Description

</label>


<textarea

value={form.description}

onChange={(e)=>setForm({

...form,

description:e.target.value

})}

className="mt-2 h-32 w-full rounded-xl bg-white/10 p-4 outline-none"

/>









<label className="block mt-6 text-slate-400">

Visibility

</label>


<select

value={form.visibility}

onChange={(e)=>setForm({

...form,

visibility:e.target.value

})}

className="mt-2 w-full rounded-xl bg-[#0f172a] p-4"

>


<option>
Public
</option>


<option>
Unlisted
</option>


</select>









<h2 className="text-2xl font-bold mt-8">

Questions

</h2>





{
form.questions?.map((q:any,index:number)=>(


<div

key={q.id}

className="mt-4 rounded-xl bg-white/5 p-5"

>


<p className="text-slate-400">

Q{index+1}

</p>


<input

value={q.title}

onChange={(e)=>{


const updated=[...form.questions];


updated[index].title=e.target.value;


setForm({

...form,

questions:updated

});


}}

className="mt-2 w-full rounded-xl bg-white/10 p-3"

/>



</div>



))
}








<button

onClick={saveChanges}

className="mt-8 flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 hover:bg-indigo-500"

>

<Save size={18}/>

Save Changes

</button>






</div>





</main>


);


}