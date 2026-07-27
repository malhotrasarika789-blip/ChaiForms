"use client";

import { ArrowLeft, Code2 } from "lucide-react";
import { useRouter } from "next/navigation";


export default function ApiDocsPage(){

const router = useRouter();


return (

<main className="min-h-screen bg-[#020617] text-white p-8">


<button

onClick={()=>router.back()}

className="flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2 mb-8 hover:bg-white/20"

>

<ArrowLeft size={18}/>

Back

</button>




<div className="max-w-4xl">


<div className="flex items-center gap-3">

<Code2 className="text-indigo-400" size={32}/>

<h1 className="text-4xl font-black">

API Documentation

</h1>

</div>



<p className="text-slate-400 mt-3">

Use your forms data with our API.

</p>





<div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6">


<h2 className="text-xl font-bold">

Get Forms

</h2>


<div className="mt-4 rounded-xl bg-black p-4 text-green-400">

GET /api/forms

</div>


</div>





<div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-6">


<h2 className="text-xl font-bold">

Create Form

</h2>


<div className="mt-4 rounded-xl bg-black p-4 text-green-400">

POST /api/forms

</div>


</div>





<div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-6">


<h2 className="text-xl font-bold">

Authentication

</h2>


<p className="text-slate-400 mt-3">

Send your API key in Authorization header.

</p>



<div className="mt-4 rounded-xl bg-black p-4 text-green-400">

Authorization: Bearer YOUR_API_KEY

</div>


</div>



</div>



</main>

);

}