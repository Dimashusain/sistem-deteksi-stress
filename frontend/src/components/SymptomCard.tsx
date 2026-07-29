"use client";

import { Gejala } from "@/services/api";
import { 
  Moon, 
  BatteryLow, 
  Brain, 
  Activity, 
  Coffee, 
  EyeOff, 
  Clock, 
  AlertCircle, 
  Frown, 
  Meh, 
  Briefcase, 
  UserMinus, 
  Heart, 
  HelpCircle, 
  Sparkles,
  HelpCircle as DefaultIcon
} from "lucide-react";

interface SymptomCardProps {
  symptom: Gejala;
  index: number;
  value: number;
  onChange: (val: number) => void;
}

const CONFIDENCE_OPTIONS = [
  { label: "Tidak", value: 0 },
  { label: "Sedikit Yakin", value: 0.4 },
  { label: "Cukup Yakin", value: 0.6 },
  { label: "Yakin", value: 0.8 },
  { label: "Sangat Yakin", value: 1.0 },
];

// Map symptom code to Lucide Icon dynamically for premium visual identity
const getSymptomIcon = (kode: string) => {
  switch (kode) {
    case "G01": return <Moon className="w-5 h-5 text-indigo-500" />;
    case "G02": return <BatteryLow className="w-5 h-5 text-amber-500" />;
    case "G03": return <Brain className="w-5 h-5 text-rose-500" />;
    case "G04": return <Activity className="w-5 h-5 text-emerald-500" />;
    case "G05": return <Coffee className="w-5 h-5 text-orange-500" />;
    case "G06": return <EyeOff className="w-5 h-5 text-indigo-500" />;
    case "G07": return <Clock className="w-5 h-5 text-blue-500" />;
    case "G08": return <AlertCircle className="w-5 h-5 text-red-500" />;
    case "G09": return <Frown className="w-5 h-5 text-pink-500" />;
    case "G10": return <Meh className="w-5 h-5 text-purple-500" />;
    case "G11": return <Briefcase className="w-5 h-5 text-sky-500" />;
    case "G12": return <UserMinus className="w-5 h-5 text-slate-500" />;
    case "G13": return <Heart className="w-5 h-5 text-rose-600" />;
    case "G14": return <HelpCircle className="w-5 h-5 text-teal-500" />;
    case "G15": return <Sparkles className="w-5 h-5 text-violet-500" />;
    default: return <DefaultIcon className="w-5 h-5 text-slate-400" />;
  }
};

export default function SymptomCard({ symptom, index, value, onChange }: SymptomCardProps) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
      
      {/* Symptom Info with Left-Aligned Icon */}
      <div className="flex items-start space-x-4 mb-5">
        <div className="bg-blue-50 dark:bg-slate-800 p-3 rounded-2xl flex-shrink-0 flex items-center justify-center">
          {getSymptomIcon(symptom.kode_gejala)}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-sans font-bold text-lg text-[#0f172a] dark:text-white leading-snug">
            {symptom.nama_gejala}
          </h3>
          {symptom.deskripsi && (
            <p className="font-sans text-sm text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
              {symptom.deskripsi}
            </p>
          )}
        </div>
      </div>

      {/* Choice Buttons Row */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {CONFIDENCE_OPTIONS.map((opt) => {
          const isSelected = Math.abs(value - opt.value) < 0.01; // Avoid JS float equality bugs
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange(opt.value)}
              className={`font-sans text-xs font-semibold py-3 px-4 rounded-xl border transition-all duration-200 flex items-center justify-center cursor-pointer select-none text-center ${
                isSelected
                  ? "bg-[#0f172a] dark:bg-white text-white dark:text-[#0f172a] border-[#0f172a] dark:border-white shadow-sm"
                  : "bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700"
              }`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>

    </div>
  );
}
