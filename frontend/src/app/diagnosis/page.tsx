"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getGejala, submitDiagnosis, Gejala, GejalaInput } from "@/services/api";
import SymptomCard from "@/components/SymptomCard";
import { 
  Activity, 
  AlertTriangle, 
  RefreshCw, 
  ShieldCheck, 
  Lock,
  ArrowRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "@/components/Sidebar";
import { translations, Language } from "@/lib/translations";

export default function DiagnosisPage() {
  const router = useRouter();
  const [lang, setLang] = useState<Language>("id");
  const [symptoms, setSymptoms] = useState<Gejala[]>([]);
  const [answers, setAnswers] = useState<Record<string | number, number>>({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 1. Fetch symptoms from backend & Load current language
  const fetchSymptoms = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getGejala();
      setSymptoms(data);
      
      const initialAnswers: Record<string | number, number> = {};
      data.forEach((sym) => {
        initialAnswers[sym.id] = 0; // Default: "Tidak" (0)
      });
      setAnswers(initialAnswers);
    } catch (err: any) {
      setError(
        lang === "en" 
          ? "Failed to connect to API server. Please make sure the Express backend is running on port 5000."
          : "Gagal terhubung dengan server API. Harap pastikan Express backend Anda sudah berjalan di port 5000."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const savedLang = localStorage.getItem("lang") as Language;
    if (savedLang === "id" || savedLang === "en") {
      setLang(savedLang);
    }
  }, []);

  useEffect(() => {
    fetchSymptoms();
  }, [lang]);

  const handleAnswerChange = (symptomId: string | number, val: number) => {
    setAnswers((prev) => ({
      ...prev,
      [symptomId]: val,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;

    setSubmitting(true);
    const payload: GejalaInput[] = Object.entries(answers).map(([id, cf_user]) => ({
      id,
      cf_user,
    }));

    try {
      const resultData = await submitDiagnosis(payload);
      localStorage.setItem("serenecheck_result", JSON.stringify(resultData));
      
      setTimeout(() => {
        router.push("/result");
      }, 2000);
    } catch (err: any) {
      alert("Error: " + err.message);
      setSubmitting(false);
    }
  };

  const t = translations[lang] || translations.id;

  return (
    <div className="h-screen w-screen flex flex-row overflow-hidden bg-[#F8FAFC] dark:bg-slate-950">
      
      {/* API Analyzing Loader Overlay */}
      <AnimatePresence>
        {submitting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/90 backdrop-blur-md z-150 flex flex-col items-center justify-center text-center px-6"
          >
            <div className="relative mb-6">
              <div className="w-20 h-20 border-4 border-accent/20 border-t-accent rounded-full animate-spin" />
              <Activity className="w-8 h-8 text-accent absolute inset-0 m-auto animate-pulse" />
            </div>
            <h2 className="font-sans font-bold text-xl text-white">
              {t.diagLoadingTitle}
            </h2>
            <p className="font-sans text-xs text-slate-400 mt-2 max-w-sm">
              {t.diagLoadingDesc}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Shared Left Sidebar (Diagnosis Active) */}
      <Sidebar activeTab="diagnosis" />

      {/* ==================================================
          MAIN CONTENT AREA (Scrollable)
          ================================================== */}
      <section className="flex-1 h-full bg-white dark:bg-slate-950 p-6 md:p-10 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          
          {/* Header Title Section */}
          <div className="flex flex-col md:flex-row md:items-end justify-between pb-4">
            <div>
              <h1 className="font-sans font-black text-3xl text-[#0f172a] dark:text-white tracking-tight">
                {t.diagTitle}
              </h1>
              <p className="font-sans text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-2xl leading-relaxed">
                {t.diagSubtitle}
              </p>
            </div>
            <div className="text-right mt-4 md:mt-0 flex-shrink-0">
              <span className="font-sans font-bold text-xs text-[#0f172a] dark:text-slate-400 block uppercase tracking-wider">
                {t.diagStep}
              </span>
              <span className="font-sans font-extrabold text-2xl text-accent block mt-0.5">1</span>
            </div>
          </div>

          {/* Thick black line under title */}
          <div className="w-full h-1 bg-[#0f172a] dark:bg-slate-800 rounded-full mb-8"></div>

          {/* LOADING SKELETON */}
          {loading && (
            <div className="space-y-6">
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-6 space-y-4 animate-pulse"
                >
                  <div className="h-6 w-1/3 bg-slate-200 dark:bg-slate-800 rounded-lg" />
                  <div className="h-4 w-2/3 bg-slate-200 dark:bg-slate-800 rounded-lg" />
                  <div className="grid grid-cols-5 gap-3 pt-2">
                    {[1, 2, 3, 4, 5].map((idx) => (
                      <div key={idx} className="h-10 bg-slate-100 dark:bg-slate-800 rounded-xl" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ERROR STATE */}
          {error && (
            <div className="bg-rose-50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/50 rounded-2xl p-8 text-center max-w-md mx-auto shadow-sm">
              <AlertTriangle className="w-12 h-12 text-rose-500 mx-auto mb-4" />
              <h2 className="font-sans font-bold text-lg text-rose-950 dark:text-rose-200">{t.diagErrTitle}</h2>
              <p className="font-sans text-xs text-rose-800/80 dark:text-rose-400/80 mt-2 leading-relaxed">
                {error}
              </p>
              <button
                onClick={fetchSymptoms}
                className="mt-6 inline-flex items-center space-x-2 bg-[#0f172a] text-white px-5 py-2.5 rounded-xl font-sans font-semibold text-xs transition-all duration-300"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>{t.diagErrRetry}</span>
              </button>
            </div>
          )}

          {/* QUESTIONNAIRE FORM */}
          {!loading && !error && symptoms.length > 0 && (
            <form onSubmit={handleSubmit} className="space-y-6 pb-12">
              
              {/* Symptoms Listing */}
              <div className="space-y-6">
                {symptoms.map((symptom, index) => (
                  <SymptomCard
                    key={symptom.id}
                    symptom={symptom}
                    index={index}
                    value={answers[symptom.id] || 0}
                    onChange={(val) => handleAnswerChange(symptom.id, val)}
                  />
                ))}
              </div>

              {/* Bottom Row Information Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                {/* Expert System Card */}
                <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-2xl p-5 flex items-center space-x-4 shadow-sm">
                  <div className="bg-blue-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400 p-3 rounded-2xl">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-sans font-bold text-sm text-[#0f172a] dark:text-white leading-tight">
                      {t.diagActive}
                    </h4>
                    <p className="font-sans text-xs text-slate-500 dark:text-slate-400 mt-1">
                      {t.diagAlgo}
                    </p>
                  </div>
                </div>

                {/* Encryption Security Card */}
                <div className="bg-[#54f1ab] border border-[#45df99] rounded-2xl p-5 flex items-center space-x-4 shadow-sm text-[#0f172a]">
                  <div className="bg-white/30 p-3 rounded-2xl text-[#0f172a]">
                    <Lock className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-sans font-bold text-sm leading-tight">
                      {t.diagPrivacy}
                    </h4>
                    <p className="font-sans text-xs opacity-75 mt-1 font-semibold">
                      {t.diagEncrypted}
                    </p>
                  </div>
                </div>
              </div>

              {/* Submit Action Block */}
              <div className="pt-6 flex justify-end">
                <button
                  type="submit"
                  className="bg-[#0f172a] hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-[#0f172a] px-10 py-4 rounded-xl font-sans font-bold text-sm shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 flex items-center space-x-2.5 cursor-pointer"
                >
                  <span>{t.diagSubmit}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </form>
          )}

          {/* EMPTY STATE - Helper if database tables are empty */}
          {!loading && !error && symptoms.length === 0 && (
            <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-2xl p-8 text-center max-w-xl mx-auto shadow-sm mt-8 mb-12">
              <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto mb-4" />
              <h2 className="font-sans font-bold text-lg text-primary dark:text-white">
                {t.diagEmptyTitle}
              </h2>
              <p className="font-sans text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                {t.diagEmptyDesc}
              </p>
              
              <div className="mt-6 bg-slate-100 dark:bg-slate-800 p-4 rounded-xl text-left font-sans text-xs space-y-2 border border-slate-200/40 dark:border-slate-700">
                <span className="font-semibold block text-[#0f172a] dark:text-white">
                  {t.diagEmptyStepsTitle}
                </span>
                <ol className="list-decimal pl-5 space-y-1.5 text-slate-600 dark:text-slate-400">
                  <li>{t.diagEmptyStep1}</li>
                  <li>{t.diagEmptyStep2}</li>
                  <li>{t.diagEmptyStep3}</li>
                  <li>{t.diagEmptyStep4}</li>
                  <li>{t.diagEmptyStep5}</li>
                  <li>{t.diagEmptyStep6}</li>
                </ol>
              </div>
            </div>
          )}

        </div>
      </section>
    </div>
  );
}
