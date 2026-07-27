import Link from "next/link";

const templates = [
  {
    title: "Customer Feedback Form",
    description: "Collect feedback from your customers",
    category: "Business",
  },
  {
    title: "Job Application Form",
    description: "Create recruitment forms easily",
    category: "HR",
  },
  {
    title: "Event Registration",
    description: "Manage event registrations",
    category: "Events",
  },
  {
    title: "Survey Form",
    description: "Create surveys and collect responses",
    category: "Survey",
  },
  {
    title: "Contact Form",
    description: "Simple contact collection form",
    category: "General",
  },
];


export default function ExplorePage() {
    return (
    <main className="min-h-screen bg-[#020617] text-white p-8">
        <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl font-bold">Explore Forms</h1>
            <p className="text-slate-400 mt-2">Discover public forms and templates</p>
            <div className="grid md:grid-cols-3 gap-6 mt-10">
                {templates.map((temp,index)=>(
                    <div key={index} className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:border-indigo-500 transition">
                        <span className="text-sm text-indigo-400">{temp.category}</span>
                        <h2 className="text-xl font-semibold mt-3">{temp.title}</h2>
                        <p className="text-slate-400 mt-2">{temp.description}</p>
                        <Link href="/dashboard/create" className="inline-block mt-5 bg-indigo-600 px-4 py-2 rounded-xl hover:bg-indigo-700">
                        Use Template
                        </Link>
                        </div>
                    ))}
        </div>
        </div>

    </main>
    );
}