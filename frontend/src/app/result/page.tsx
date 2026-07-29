"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DiagnosisResponse } from "@/services/api";
import CircularProgress from "@/components/CircularProgress";
import RecommendationCard from "@/components/RecommendationCard";
import { 
  FileText, 
  RefreshCcw, 
  ShieldAlert, 
  Calendar, 
  FileCheck,
  ArrowRight
} from "lucide-react";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import { translations, Language } from "@/lib/translations";

export default function ResultDashboardPage() {
  const router = useRouter();
  const [lang, setLang] = useState<Language>("id");
  const [result, setResult] = useState<DiagnosisResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Language preference
    const savedLang = localStorage.getItem("lang") as Language;
    if (savedLang === "id" || savedLang === "en") {
      setLang(savedLang);
    }

    // Results load
    const stored = localStorage.getItem("serenecheck_result");
    if (stored) {
      try {
        setResult(JSON.parse(stored));
      } catch (e) {
        console.error("Gagal mendecode hasil diagnosis:", e);
      }
    }
    setLoading(false);
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const handleReset = () => {
    localStorage.removeItem("serenecheck_result");
    router.push("/diagnosis");
  };

  const t = translations[lang] || translations.id;

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-[#F8FAFC] dark:bg-slate-950">
        <div className="w-12 h-12 border-4 border-accent/20 border-t-accent rounded-full animate-spin" />
      </div>
    );
  }

  const printDate = new Date().toLocaleDateString(lang === "en" ? "en-US" : "id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="h-screen w-screen flex flex-row overflow-hidden bg-[#F8FAFC] dark:bg-slate-950 print:h-auto print:w-auto print:overflow-visible">
      
      {/* Shared Left Sidebar (History Active) */}
      <Sidebar activeTab="history" />

      {/* ==================================================
          MAIN CONTENT AREA (Scrollable)
          ================================================== */}
      <section className="flex-grow bg-white dark:bg-slate-950 p-6 md:p-10 overflow-y-auto h-full print:h-auto print:overflow-visible print:p-0">
        <div className="max-w-4xl mx-auto">
          
          {/* PRINT-ONLY OFFICIAL REPORT HEADER */}
          <div className="hidden print:block border-b-2 border-slate-900 pb-6 mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="font-sans font-black text-2xl text-slate-900">{t.resReportHeader}</h1>
                <p className="font-sans text-xs text-slate-500 mt-1">{t.resReportSub}</p>
              </div>
              <div className="text-right text-xs text-slate-500">
                <p className="flex items-center gap-1 justify-end font-semibold text-slate-900">
                  <Calendar className="w-3.5 h-3.5" /> {t.resPrintDate}
                </p>
                <p className="mt-1">{printDate}</p>
              </div>
            </div>
          </div>

          {/* Header Title Section */}
          <div className="flex flex-col md:flex-row md:items-end justify-between pb-4 print:hidden">
            <div>
              <h1 className="font-sans font-black text-3xl text-[#0f172a] dark:text-white tracking-tight">
                {t.resTitle}
              </h1>
              <p className="font-sans text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-2xl leading-relaxed">
                {t.resSubtitle}
              </p>
            </div>
            <div className="text-right mt-4 md:mt-0 flex-shrink-0">
              <span className="font-sans font-bold text-xs text-[#0f172a] dark:text-slate-400 block uppercase tracking-wider">
                {t.resStatus}
              </span>
              <span className="font-sans font-extrabold text-2xl text-[#10b981] block mt-0.5">{t.resFinished}</span>
            </div>
          </div>

          {/* Thick black line under title */}
          <div className="w-full h-1 bg-[#0f172a] dark:bg-slate-800 rounded-full mb-8 print:hidden"></div>

          {/* EMPTY STATE */}
          {!result ? (
            <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-2xl p-8 text-center max-w-md mx-auto shadow-sm">
              <ShieldAlert className="w-12 h-12 text-slate-400 dark:text-slate-500 mx-auto mb-4" />
              <h2 className="font-sans font-bold text-lg text-primary dark:text-white">{t.resEmptyTitle}</h2>
              <p className="font-sans text-xs text-slate-400 dark:text-slate-500 mt-2 leading-relaxed">
                {t.resEmptyDesc}
              </p>
              <Link
                href="/diagnosis"
                className="mt-6 inline-flex items-center space-x-2 bg-[#0f172a] text-white px-6 py-3 rounded-xl font-sans font-bold text-sm transition-all duration-300 hover:-translate-y-0.5 shadow-sm"
              >
                <span>{t.resEmptyBtn}</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          ) : (
            // RESULT DASHBOARD SECTION
            <div className="space-y-8 pb-12">
              
              {/* Actions Toolbar */}
              <div className="flex items-center space-x-3 w-full sm:w-auto justify-end print:hidden">
                <button
                  onClick={handlePrint}
                  className="inline-flex items-center justify-center space-x-2 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-800 px-5 py-3 rounded-xl font-sans font-bold text-xs shadow-sm transition-all cursor-pointer"
                >
                  <FileText className="w-4.5 h-4.5" />
                  <span>{t.resPrintBtn}</span>
                </button>
                
                <button
                  onClick={handleReset}
                  className="inline-flex items-center justify-center space-x-2 bg-[#0f172a] hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-[#0f172a] px-5 py-3 rounded-xl font-sans font-bold text-xs shadow-sm transition-all cursor-pointer"
                >
                  <RefreshCcw className="w-4.5 h-4.5" />
                  <span>{t.resResetBtn}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Left Summary and calculations chart */}
                <div className="md:col-span-2 space-y-6">
                  
                  {/* Diagnosis summary card */}
                  <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-2xl p-6 shadow-sm print:border-none print:p-0">
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                      <div className="flex-shrink-0">
                        <CircularProgress value={result.nilai_cf} label="Nilai CF" size={150} />
                      </div>
                      <div className="flex-grow text-center sm:text-left">
                        <span className="font-sans font-bold text-[10px] uppercase tracking-wider text-accent bg-accent/5 dark:bg-accent/15 px-3 py-1 rounded-full inline-block mb-2.5">
                          {t.resClassification}
                        </span>
                        <h2 className="font-sans font-extrabold text-2xl text-[#0f172a] dark:text-white tracking-tight">
                          {result.hasil === "Stress Ringan" && lang === "en" ? "Mild Stress" :
                           result.hasil === "Stress Sedang" && lang === "en" ? "Moderate Stress" :
                           result.hasil === "Stress Berat" && lang === "en" ? "Severe Stress" : result.hasil}
                        </h2>
                        <p className="font-sans text-sm text-slate-500 dark:text-slate-400 mt-3 leading-relaxed">
                          {result.deskripsi}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Breakdown table */}
                  <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-2xl p-6 shadow-sm print:border-none print:p-0">
                    <h3 className="font-sans font-bold text-sm text-[#0f172a] dark:text-white mb-4">
                      {t.resProbabilityTitle}
                    </h3>
                    <div className="space-y-3">
                      {result.detail.map((det) => {
                        const isWinner = det.nama === result.hasil;
                        const percent = Math.round(det.nilai_cf * 100);
                        const displayTitle = det.nama === "Stress Ringan" && lang === "en" ? "Mild Stress" :
                                             det.nama === "Stress Sedang" && lang === "en" ? "Moderate Stress" :
                                             det.nama === "Stress Berat" && lang === "en" ? "Severe Stress" : det.nama;
                        return (
                          <div key={det.id} className={`flex items-center justify-between p-3.5 rounded-xl border ${
                            isWinner 
                              ? "border-accent bg-accent/[0.02]" 
                              : "border-slate-100 dark:border-slate-800"
                          }`}>
                            <div className="flex items-center space-x-3">
                              <div className={`w-2 h-2 rounded-full ${
                                isWinner ? "bg-accent" : "bg-slate-300 dark:bg-slate-600"
                              }`} />
                              <span className={`font-sans text-xs font-bold ${
                                isWinner ? "text-[#0f172a] dark:text-white" : "text-slate-500 dark:text-slate-400"
                              }`}>
                                {displayTitle} ({det.kode_gangguan})
                              </span>
                            </div>
                            <div className="text-right">
                              <span className={`font-sans text-xs font-bold block ${
                                isWinner ? "text-accent" : "text-slate-500 dark:text-slate-400"
                              }`}>
                                {percent}%
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                </div>

                {/* Right Recommendations and Disclaimer */}
                <div className="space-y-6">
                  <RecommendationCard solusi={result.solusi} hasil={result.hasil} />
                  
                  {/* Dark Disclaimer Box */}
                  <div className="bg-slate-900 text-slate-300 rounded-2xl p-5 border border-slate-800 print:bg-transparent print:text-slate-850 print:border-t-2 print:border-slate-900 print:p-0">
                    <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-white print:text-slate-900 mb-3">
                      {t.resDisclaimerTitle}
                    </h4>
                    <p className="font-sans text-[11px] text-slate-400 leading-relaxed print:text-slate-600">
                      {t.resDisclaimerDesc}
                    </p>
                  </div>
                </div>
              </div>

              {/* PRINT-ONLY SIGNATURE SECTION */}
              <div className="hidden print:block mt-16 pt-10 border-t border-dashed border-slate-300">
                <div className="flex justify-between text-xs text-slate-500">
                  <div>
                    <p>{t.resPrintVerify}</p>
                    <p className="mt-1 flex items-center gap-1 font-semibold text-slate-900">
                      <FileCheck className="w-4 h-4 text-emerald-600" /> {t.resPrintInference}
                    </p>
                    <p className="mt-1">{t.resPrintStatus}</p>
                  </div>
                  <div className="text-right">
                    <p>{t.resPrintSign}</p>
                    <p className="mt-12 border-b border-slate-400 w-40 ml-auto"></p>
                    <p className="mt-1">{t.resPrintUser}</p>
                  </div>
                </div>
              </div>

            </div>
          )}

        </div>
      </section>
    </div>
  );
}
