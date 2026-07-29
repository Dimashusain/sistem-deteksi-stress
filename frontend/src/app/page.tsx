"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { 
  Brain, 
  ShieldCheck, 
  Lock, 
  ArrowRight,
  Sparkles
} from "lucide-react";
import Sidebar from "@/components/Sidebar";
import { translations, Language } from "@/lib/translations";

export default function HomeDashboard() {
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
      
      {/* Reusable Sidebar (Home Active) */}
      <Sidebar activeTab="home" />

      {/* ==================================================
          MAIN CONTENT AREA (Scrollable)
          ================================================== */}
      <section className="flex-1 h-full bg-white dark:bg-slate-950 p-6 md:p-10 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          
          {/* Header Title Section */}
          <div className="flex flex-col md:flex-row md:items-end justify-between pb-4">
            <div>
              <h1 className="font-sans font-black text-3xl text-[#0f172a] dark:text-white tracking-tight">
                {t.homeTitle}
              </h1>
              <p className="font-sans text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-2xl leading-relaxed">
                {t.homeSubtitle}
              </p>
            </div>
            <div className="text-right mt-4 md:mt-0 flex-shrink-0">
              <span className="font-sans font-bold text-xs text-[#0f172a] dark:text-slate-400 block uppercase tracking-wider">
                {t.activeAlgorithm}
              </span>
              <span className="font-sans font-extrabold text-2xl text-accent block mt-0.5">CF v2.4</span>
            </div>
          </div>

          {/* Thick black line under title */}
          <div className="w-full h-1 bg-[#0f172a] dark:bg-slate-800 rounded-full mb-8"></div>

          {/* Content Widgets */}
          <div className="space-y-8">
            
            {/* Main Welcome Hero CTA */}
            <div className="bg-[#0f172a] text-white rounded-2xl p-8 relative overflow-hidden shadow-md">
              <div className="absolute -top-16 -right-16 w-48 h-48 bg-accent/20 rounded-full blur-2xl" />
              <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-[#54f1ab]/10 rounded-full blur-2xl" />
              
              <div className="relative z-10 max-w-2xl">
                <div className="inline-flex items-center space-x-2 bg-white/10 text-[#54f1ab] px-3.5 py-1.5 rounded-full mb-4">
                  <Sparkles className="w-4 h-4" />
                  <span className="font-sans font-bold text-[10px] uppercase tracking-wider">
                    {t.homeBadge}
                  </span>
                </div>
                <h2 className="font-sans font-bold text-2xl sm:text-3xl leading-snug tracking-tight">
                  {t.homeHeroTitle}
                </h2>
                <p className="font-sans text-slate-300 text-sm mt-3 leading-relaxed max-w-xl">
                  {t.homeHeroDesc}
                </p>
                
                <div className="mt-8">
                  <Link
                    href="/diagnosis"
                    className="bg-[#54f1ab] hover:bg-[#45df99] text-[#0f172a] px-8 py-3.5 rounded-xl font-sans font-bold text-sm shadow transition-all duration-300 inline-flex items-center space-x-2 hover:-translate-y-0.5"
                  >
                    <span>{t.homeHeroBtn}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Informational Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-8">
              
              {/* Method Summary */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
                <div className="bg-blue-50 dark:bg-slate-800 text-blue-600 dark:text-blue-400 p-3 rounded-2xl w-fit mb-5">
                  <Brain className="w-6 h-6" />
                </div>
                <h3 className="font-sans font-bold text-lg text-[#0f172a] dark:text-white mb-2">
                  {t.homeCardMethodTitle}
                </h3>
                <p className="font-sans text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  {t.homeCardMethodDesc}
                </p>
                <Link href="/tentang" className="inline-flex items-center text-sm font-bold text-accent mt-4 hover:underline">
                  <span>{t.homeCardMethodLink}</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Link>
              </div>

              {/* Privacy Card */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
                <div className="bg-emerald-50 dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 p-3 rounded-2xl w-fit mb-5">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="font-sans font-bold text-lg text-[#0f172a] dark:text-white mb-2">
                  {t.homeCardPrivacyTitle}
                </h3>
                <p className="font-sans text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  {t.homeCardPrivacyDesc}
                </p>
                <div className="flex items-center text-xs text-emerald-600 dark:text-emerald-400 font-bold mt-5">
                  <Lock className="w-3.5 h-3.5 mr-1.5" />
                  <span>{t.homeCardPrivacyBadge}</span>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>
    </div>
  );
}
