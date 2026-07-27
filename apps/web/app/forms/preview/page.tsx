"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export default function PreviewPage(){

const router = useRouter();

const [form,setForm] = useState<any>(null);

const [theme,setTheme] = useState("Midnight 🌙");



useEffect(()=>{


const data = JSON.parse(

localStorage.getItem("previewForm") || "null"

);


setForm(data);


if(data?.theme){

setTheme(data.theme);

}


},[]);





const themeClass =

theme.includes("Ocean")

?

"bg-blue-950"

:

theme.includes("Sunset")

?

"bg-orange-950"

:

theme.includes("Minimal")

?

"bg-slate-900"

:

"bg-[#020617]";






if(!form){


return (

<main className={`min-h-screen ${themeClass} text-white p-10`}>

<h1 className="text-2xl font-bold">

No Preview Available ❌

</h1>

</main>

);


}





return (


<main className={`min-h-screen ${themeClass} text-white p-8 flex justify-center`}>



<div className="w-full max-w-2xl">



<button

onClick={()=>router.back()}

className="
flex
items-center
gap-2
rounded-xl
bg-white/10
px-4
py-2
mb-8
hover:bg-white/20
"

>

<ArrowLeft size={18}/>

Back

</button>







<div className="rounded-3xl border border-white/10 bg-white/5 p-8">





<h1 className="text-4xl font-black">

{form.title}

</h1>




<p className="mt-3 text-slate-400">

{form.description}

</p>







<div className="mt-8 space-y-5">



{
form.questions?.map((q:any,index:number)=>(


<div

key={q.id}

className="rounded-2xl bg-white/5 p-5"

>



<label className="font-semibold">

Q{index+1}. {q.title}

</label>







{
q.type==="Select"

?


<select

disabled

className="
mt-3
w-full
rounded-xl
bg-[#0f172a]
p-3
"

>

<option>

Choose option

</option>

<option>

Option 1

</option>

<option>

Option 2

</option>


</select>



:


q.type==="Checkbox"


?


<div className="mt-3 flex gap-2 items-center">

<input

type="checkbox"

disabled

/>

Checkbox Option

</div>



:


<input

disabled

placeholder={q.type}

className="
mt-3
w-full
rounded-xl
bg-white/10
p-3
"

/>



}




</div>



))

}



</div>







<button

className="
mt-8
w-full
rounded-xl
bg-indigo-600
py-4
font-bold
opacity-70
"

disabled

>

Submit Response 🚀

</button>






</div>





</div>



</main>


);


}