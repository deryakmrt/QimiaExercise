import { LucideIcon } from "lucide-react";

type ExpertiseCardProps = {
  // props tiplerini tanımlıyoruz
  title: string;
  description: string; //fonksiyon parametreleri için tipleri belirliyoruz
  icon: LucideIcon; // icon prop'u için LucideIcon tipini kullanıyoruz
};

export default function ExpertiseCard({
  title,
  description,
  icon: Icon,
}: ExpertiseCardProps) {
  return (
    <div className="border border-gray-200 rounded-sm overflow-hidden bg-white">
      <div className="flex items-center gap-4 bg-gray-100 p-5">
        <div className="w-14 h-14 shrink-0 rounded-sm bg-linear-to-br from-amber-300 to-amber-500 flex items-center justify-center">
          <Icon className="w-7 h-7 text-white" />
        </div>
        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
      </div>
      <p className="p-5 text-sm text-gray-600 leading-relaxed text-center">
        {description}
      </p>
    </div>
  );
}
