import { Lightbulb, CheckCircle2, AlertCircle } from "lucide-react";

interface RecommendationCardProps {
  solusi: string;
  hasil: string;
}

export default function RecommendationCard({ solusi, hasil }: RecommendationCardProps) {
  // Convert list points from the solusi text
  const points = solusi
    .split(",")
    .map((point) => point.trim())
    .filter((point) => point.length > 0);

  return (
    <div className="bg-white dark:bg-slate-900 border border-border-custom dark:border-slate-800 rounded-custom p-6 shadow-soft hover:shadow-md transition-all duration-300">
      
      {/* Header */}
      <div className="flex items-center space-x-3 mb-5 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div className="bg-accent/10 text-accent p-2 rounded-xl">
          <Lightbulb className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-sans font-bold text-base text-primary dark:text-white">
            Rekomendasi Pemulihan Stres
          </h3>
          <p className="font-sans text-xs text-slate-400 dark:text-slate-500">
            Saran penanganan praktis untuk kondisi {hasil} Anda
          </p>
        </div>
      </div>

      {/* Point list */}
      <div className="space-y-4">
        {points.map((point, index) => (
          <div key={index} className="flex items-start space-x-3.5 group">
            <div className="text-accent mt-0.5 bg-accent/5 dark:bg-accent/10 p-1 rounded-full group-hover:bg-accent group-hover:text-white transition-colors duration-300 flex-shrink-0">
              <CheckCircle2 className="w-4.5 h-4.5" />
            </div>
            <p className="font-sans text-sm text-secondary dark:text-slate-300 leading-relaxed">
              {point}
            </p>
          </div>
        ))}
      </div>

      {/* Alert note */}
      <div className="bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 rounded-2xl p-4 mt-6 flex items-start space-x-3">
        <AlertCircle className="w-5 h-5 text-slate-400 dark:text-slate-500 mt-0.5 flex-shrink-0" />
        <div>
          <span className="font-sans font-semibold text-xs text-primary dark:text-white block">
            Penting untuk Dicatat
          </span>
          <span className="font-sans text-xs text-slate-400 dark:text-slate-500 mt-0.5 block leading-relaxed">
            Perubahan kecil dalam kebiasaan harian Anda dapat menghasilkan dampak psikologis yang besar. Mulailah dari satu rekomendasi yang paling mudah diterapkan hari ini.
          </span>
        </div>
      </div>

    </div>
  );
}
