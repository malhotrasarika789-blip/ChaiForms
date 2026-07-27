"use client";

import { ArrowLeft, Download } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export default function ResponsesPage(){


const router = useRouter();


const [forms,setForms] = useState<any[]>([]);



useEffect(()=>{


const saved = JSON.parse(

localStorage.getItem("forms") || "[]"

);


setForms(saved);


},[]);






const exportCSV=(form:any)=>{


let csv="Response,Date\n";


form.responses?.forEach((res:any,index:number)=>{


csv += `Response ${index+1},${res.submittedAt}\n`;


});



const blob = new Blob(

[csv],

{
type:"text/csv"
}

);



const url = URL.createObjectURL(blob);


const link=document.createElement("a");


link.href=url;


link.download =
`${form.title}-responses.csv`;


link.click();



};







return (

<main className="min-h-screen bg-[#020617] text-white p-8">





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







<h1 className="text-4xl font-black">

Responses 📊

</h1>


<p className="mt-2 text-slate-400">

View all collected responses

</p>








<div className="mt-10 space-y-6">





{
forms.map((form)=>(


<div

key={form.id}

className="
rounded-3xl
border
border-white/10
bg-white/5
p-6
"

>



<div className="flex justify-between items-center">


<div>


<h2 className="text-2xl font-bold">

{form.title}

</h2>


<p className="text-slate-400 mt-2">

Total Responses:

{form.responses?.length || 0}

</p>


</div>






<button

onClick={()=>exportCSV(form)}

className="
flex
items-center
gap-2
rounded-xl
bg-indigo-600
px-4
py-2
"

>

<Download size={18}/>

Export CSV

</button>




</div>









<div className="mt-6 space-y-4">



{
form.responses?.length===0 ?

<p className="text-slate-400">

No responses yet

</p>



:


form.responses.map((res:any,index:number)=>(



<div

key={index}

className="
rounded-xl
bg-white/5
p-4
"

>


<h3 className="font-bold">

Response {index+1}

</h3>



<p className="text-slate-400 text-sm mt-2">

Submitted:

{new Date(res.submittedAt).toLocaleString()}

</p>




<div className="mt-3">


{
Object.entries(res.answers || {}).map(
([key,value]:any)=>(


<p key={key}>

{key}: {value}

</p>


)

)

}



</div>




</div>


))

}





</div>






</div>



))

}





</div>





</main>

);


}