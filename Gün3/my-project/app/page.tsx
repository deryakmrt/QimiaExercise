import { PenTool, Cpu, Database } from "lucide-react";
import ExpertiseCard from "./components/ExpertiseCard";

const expertiseItems = [
  {
    title: "Product Design",
    description: "Creating a visual representation of your brand that can withstand the test of time, in both the physical and digital realm using state-of-the-art techniques and tools.",
    icon: PenTool,
  },
  {
    title: "AI And Data Science",
    description: "Comprehensive data science and Al services, to help clients determine their Al-goals and squeeze the most ROI and, of course, take care of models' implementation and deployment.",
    icon: Cpu,
  },
  {
    title: "Big Data/Data Warehousing Systems",
    description: "Our modern tech-stack allows us to interpret, categorize and sort all your business's data, allowing clients to generate business-critical insights.",
    icon: Database,
  }
];


export default function Home() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      
      {/* Tab bölümü */}
      <div className="flex justify-center gap-8 border-b border-gray-200">

        <div className="relative w-fit pb-4">
          <span className="text-2xl font-bold text-gray-900">Expertise</span>
          <div className="absolute -bottom-px left-0 right-0 h-1 bg-linear-to-r from-blue-400 to-indigo-600" />
        </div>

        <div className="w-fit pb-4">
          <span className="text-2xl text-gray-400">How We Work</span>
        </div>
      </div>

      {/* Kart grid'i */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {expertiseItems.map((item) => (
          <ExpertiseCard key={item.title} title={item.title} description={item.description} icon={item.icon} />
        ))}
      </div>

    </main>
  );
}