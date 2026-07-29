"use client";

import { useEffect, useState } from "react";
import { 
  Brain, 
  Cpu, 
  AlertCircle
} from "lucide-react";
import Sidebar from "@/components/Sidebar";
import { translations, Language } from "@/lib/translations";

export default function TentangDashboardPage() {
  const [lang, setLang] = useState<Language>("id");

  useEffect(() => {
    const savedLang = localStorage.getItem("lang") as Language;
    if (savedLang === "id" || savedLang === "en") {
      setLang(savedLang);
    }
  }, []);

  const t = translations[lang] || translations.id;

  return (
    <div className="h-screen w-screen flex flex-row overflow-hidden bg-[#F8FAFC] dark:bg-slate-950">
      
      {/* Shared Left Sidebar (About Active) */}
      <Sidebar activeTab="about" />

      {/* ==================================================
          MAIN CONTENT AREA (Scrollable)
          ================================================== */}
      <section className="flex-1 h-full bg-white dark:bg-slate-950 p-6 md:p-10 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          
          {/* Header Title Section */}
          <div className="flex flex-col md:flex-row md:items-end justify-between pb-4">
            <div>
              <h1 className="font-sans font-black text-3xl text-[#0f172a] dark:text-white tracking-tight">
                {t.aboutTitle}
              </h1>
              <p className="font-sans text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-2xl leading-relaxed">
                {t.aboutSubtitle}
              </p>
            </div>
            <div className="text-right mt-4 md:mt-0 flex-shrink-0">
              <span className="font-sans font-bold text-xs text-[#0f172a] dark:text-slate-400 block uppercase tracking-wider">
                {t.aboutBadge}
              </span>
              <span className="font-sans font-extrabold text-2xl text-accent block mt-0.5">
                {t.aboutFormulaTitle}
              </span>
            </div>
          </div>

          {/* Thick black line under title */}
          <div className="w-full h-1 bg-[#0f172a] dark:bg-slate-800 rounded-full mb-8"></div>

          {/* About Page Contents */}
          <div className="space-y-8 pb-12">
            
            {/* Card 1: Expert System */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 p-2.5 rounded-xl">
                  <Cpu className="w-5 h-5" />
                </div>
                <h3 className="font-sans font-bold text-lg text-[#0f172a] dark:text-white">
                  {t.aboutCard1Title}
                </h3>
              </div>
              <p className="font-sans text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {t.aboutCard1Desc}
              </p>
            </div>

            {/* Card 2: Certainty Factor */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-blue-50 dark:bg-slate-800 text-blue-600 dark:text-blue-400 p-2.5 rounded-xl">
                  <Brain className="w-5 h-5" />
                </div>
                <h3 className="font-sans font-bold text-lg text-[#0f172a] dark:text-white">
                  {t.aboutCard2Title}
                </h3>
              </div>
              
              <div className="space-y-4 font-sans text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                <p>
                  {t.aboutCard2Desc1}
                </p>
                
                <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl font-mono text-xs text-[#0f172a] dark:text-slate-300 border border-slate-200/40 dark:border-slate-800">
                  <span className="block text-slate-400 mb-1">{t.aboutCard2Formula1}</span>
                  <code className="bg-white dark:bg-slate-900 px-2.5 py-1 rounded border border-slate-200/80 dark:border-slate-800 inline-block font-bold">
                    CF(H,E) = CF(User) &times; CF(Pakar)
                  </code>

                  <span className="block text-slate-400 mt-4 mb-1">{t.aboutCard2Formula2}</span>
                  <code className="bg-white dark:bg-slate-900 px-2.5 py-1 rounded border border-slate-200/80 dark:border-slate-800 inline-block font-bold">
                    CF_combine(CF_old, CF_new) = CF_old + CF_new &times; (1 - CF_old)
                  </code>
                </div>

                <p>
                  {t.aboutCard2Desc2}
                </p>
              </div>
            </div>

            {/* Card 3: Medical Disclaimer */}
            <div className="bg-slate-900 text-slate-300 rounded-2xl p-6 border border-slate-800 shadow-md">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-amber-500/10 text-amber-500 p-2.5 rounded-xl">
                  <AlertCircle className="w-5 h-5" />
                </div>
                <h3 className="font-sans font-bold text-lg text-white">
                  {t.aboutCard3Title}
                </h3>
              </div>
              
              <p className="font-sans text-xs text-slate-400 leading-relaxed mb-4">
                {t.aboutCard3Desc1}
              </p>
              
              <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-800 text-xs text-slate-400 leading-relaxed">
                {t.aboutCard3Desc2}
              </div>
            </div>

          </div>

        </div>
      </section>
    </div>
  );
}
