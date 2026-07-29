"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Activity, 
  Home, 
  Clock, 
  Info, 
  Settings, 
  User, 
  Sun, 
  Moon, 
  Languages, 
  X, 
  Check,
  HelpCircle
} from "lucide-react";
import { translations, Language } from "@/lib/translations";
import { motion, AnimatePresence } from "framer-motion";

interface SidebarProps {
  activeTab: "home" | "diagnosis" | "history" | "about";
}

export default function Sidebar({ activeTab }: SidebarProps) {
  const router = useRouter();
  const [lang, setLang] = useState<Language>("id");
  const [isDark, setIsDark] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);

  // 1. Initial configuration load on mount
  useEffect(() => {
    // Theme load
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    } else if (savedTheme === "light") {
      setIsDark(false);
      document.documentElement.classList.remove("dark");
    } else {
      const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setIsDark(systemPrefersDark);
      if (systemPrefersDark) {
        document.documentElement.classList.add("dark");
      }
    }

    // Language load
    const savedLang = localStorage.getItem("lang") as Language;
    if (savedLang === "id" || savedLang === "en") {
      setLang(savedLang);
    }
  }, []);

  const handleToggleTheme = (dark: boolean) => {
    setIsDark(dark);
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const handleToggleLang = (selectedLang: Language) => {
    setLang(selectedLang);
    localStorage.setItem("lang", selectedLang);
    // Reload window to apply translated strings across current screen content instantly
    window.location.reload();
  };

  const t = translations[lang] || translations.id;

  return (
    <>
      {/* ==================================================
          LEFT SIDEBAR PANEL
          ================================================== */}
      <aside className="hidden lg:flex w-64 h-full bg-[#f8fafc] dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex-col justify-between p-6 select-none flex-shrink-0 print:hidden">
        <div className="space-y-6">
          {/* Brand Logo in Sidebar */}
          <div className="px-1 py-2 border-b border-slate-200/50 dark:border-slate-800/50 pb-4">
            <span className="font-sans font-black text-xl tracking-tight text-[#0f172a] dark:text-white">
              {t.brand}
            </span>
          </div>

          {/* User Profile Card */}
          <div className="flex items-center space-x-3.5 px-1 py-1">
            <div className="w-10 h-10 rounded-full bg-[#0f172a] border-2 border-accent text-white flex items-center justify-center flex-shrink-0">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-sans font-bold text-sm text-[#0f172a] dark:text-white leading-tight">
                {t.portal}
              </h4>
              <span className="font-sans text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                {t.monitoring}
              </span>
            </div>
          </div>

          {/* Sidebar Navigation */}
          <nav className="flex flex-col space-y-1 pt-2">
            {/* Tab: Home */}
            <Link 
              href="/" 
              className={`flex items-center space-x-3 px-4 py-3 rounded-xl font-sans text-sm transition-all ${
                activeTab === "home"
                  ? "bg-[#54f1ab] text-[#0f172a] font-bold shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold"
              }`}
            >
              <Home className="w-5 h-5" />
              <span>{t.home}</span>
            </Link>

            {/* Tab: Diagnosis */}
            <Link 
              href="/diagnosis" 
              className={`flex items-center space-x-3 px-4 py-3 rounded-xl font-sans text-sm transition-all ${
                activeTab === "diagnosis"
                  ? "bg-[#54f1ab] text-[#0f172a] font-bold shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold"
              }`}
            >
              <Activity className="w-5 h-5" />
              <span>{t.diagnosis}</span>
            </Link>

            {/* Tab: History */}
            <Link 
              href="/result" 
              className={`flex items-center space-x-3 px-4 py-3 rounded-xl font-sans text-sm transition-all ${
                activeTab === "history"
                  ? "bg-[#54f1ab] text-[#0f172a] font-bold shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold"
              }`}
            >
              <Clock className="w-5 h-5" />
              <span>{t.history}</span>
            </Link>

            {/* Tab: About */}
            <Link 
              href="/tentang" 
              className={`flex items-center space-x-3 px-4 py-3 rounded-xl font-sans text-sm transition-all ${
                activeTab === "about"
                  ? "bg-[#54f1ab] text-[#0f172a] font-bold shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold"
              }`}
            >
              <Info className="w-5 h-5" />
              <span>{t.about}</span>
            </Link>
          </nav>
        </div>

        <div className="space-y-4">
          {/* Settings Trigger Link */}
          <button 
            type="button"
            onClick={() => setIsSettingsOpen(true)}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-sans font-semibold text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all text-left cursor-pointer"
          >
            <Settings className="w-5 h-5" />
            <span>{t.settings}</span>
          </button>

          <Link 
            href="/diagnosis"
            className="w-full bg-[#0f172a] hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-[#0f172a] py-3.5 rounded-xl font-sans font-bold text-sm shadow transition-all block text-center cursor-pointer select-none"
          >
            {t.startDiagnosis}
          </Link>
        </div>
      </aside>

      {/* ==================================================
          SETTINGS MODAL OVERLAY
          ================================================== */}
      <AnimatePresence>
        {isSettingsOpen && (
          <div className="fixed inset-0 z-150 flex items-center justify-center p-4">
            
            {/* Backdrop overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSettingsOpen(false)}
              className="fixed inset-0 bg-[#0f172a]/60 backdrop-blur-sm"
            />
            
            {/* Modal Card Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring" as const, duration: 0.4 }}
              className="relative w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-xl z-10"
            >
              {/* Close icon button */}
              <button
                type="button"
                onClick={() => setIsSettingsOpen(false)}
                className="absolute top-4 right-4 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-350 p-1.5 rounded-lg transition-all"
              >
                <X className="w-4.5 h-4.5" />
              </button>

              {/* Header Title Section */}
              <div className="flex items-center space-x-3 mb-5">
                <div className="bg-[#54f1ab]/10 text-accent p-2 rounded-xl">
                  <Settings className="w-5.5 h-5.5" />
                </div>
                <div>
                  <h3 className="font-sans font-bold text-lg text-[#0f172a] dark:text-white leading-tight">
                    {t.settingsTitle}
                  </h3>
                  <p className="font-sans text-xs text-slate-400 dark:text-slate-500 mt-1">
                    {t.settingsSubtitle}
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                
                {/* 1. Theme Configuration Row */}
                <div className="space-y-2">
                  <span className="font-sans font-bold text-xs text-[#0f172a] dark:text-white uppercase tracking-wider block">
                    {t.themeLabel}
                  </span>
                  
                  <div className="grid grid-cols-2 gap-3">
                    {/* Light Mode Button */}
                    <button
                      type="button"
                      onClick={() => handleToggleTheme(false)}
                      className={`flex items-center justify-center space-x-2 py-3 rounded-xl border font-sans text-xs font-bold transition-all cursor-pointer ${
                        !isDark
                          ? "bg-slate-50 border-[#0f172a] text-[#0f172a] shadow-sm"
                          : "bg-white dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                      }`}
                    >
                      <Sun className="w-4 h-4" />
                      <span>{t.themeLight}</span>
                      {!isDark && <Check className="w-3.5 h-3.5 ml-1 text-[#0f172a]" />}
                    </button>

                    {/* Dark Mode Button */}
                    <button
                      type="button"
                      onClick={() => handleToggleTheme(true)}
                      className={`flex items-center justify-center space-x-2 py-3 rounded-xl border font-sans text-xs font-bold transition-all cursor-pointer ${
                        isDark
                          ? "bg-slate-800 border-accent text-white shadow-sm"
                          : "bg-white dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                      }`}
                    >
                      <Moon className="w-4 h-4" />
                      <span>{t.themeDark}</span>
                      {isDark && <Check className="w-3.5 h-3.5 ml-1 text-accent" />}
                    </button>
                  </div>
                </div>

                {/* 2. Language Configuration Row */}
                <div className="space-y-2">
                  <span className="font-sans font-bold text-xs text-[#0f172a] dark:text-white uppercase tracking-wider block">
                    {t.langLabel}
                  </span>

                  <div className="grid grid-cols-2 gap-3">
                    {/* ID Button */}
                    <button
                      type="button"
                      onClick={() => handleToggleLang("id")}
                      className={`flex items-center justify-center space-x-2 py-3 rounded-xl border font-sans text-xs font-bold transition-all cursor-pointer ${
                        lang === "id"
                          ? "bg-[#54f1ab]/10 border-[#54f1ab] text-[#0f172a] dark:text-[#54f1ab] shadow-sm"
                          : "bg-white dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                      }`}
                    >
                      <Languages className="w-4 h-4" />
                      <span>{t.langId}</span>
                      {lang === "id" && <Check className="w-3.5 h-3.5 ml-1 text-accent" />}
                    </button>

                    {/* EN Button */}
                    <button
                      type="button"
                      onClick={() => handleToggleLang("en")}
                      className={`flex items-center justify-center space-x-2 py-3 rounded-xl border font-sans text-xs font-bold transition-all cursor-pointer ${
                        lang === "en"
                          ? "bg-[#54f1ab]/10 border-[#54f1ab] text-[#0f172a] dark:text-[#54f1ab] shadow-sm"
                          : "bg-white dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                      }`}
                    >
                      <Languages className="w-4 h-4" />
                      <span>{t.langEn}</span>
                      {lang === "en" && <Check className="w-3.5 h-3.5 ml-1 text-accent" />}
                    </button>
                  </div>
                </div>

              </div>

              {/* Close Settings Action Footer */}
              <div className="mt-8">
                <button
                  type="button"
                  onClick={() => setIsSettingsOpen(false)}
                  className="w-full bg-[#0f172a] dark:bg-white dark:hover:bg-slate-100 text-white dark:text-[#0f172a] py-3.5 rounded-xl font-sans font-bold text-xs shadow-sm hover:shadow transition-all text-center cursor-pointer"
                >
                  {t.closeBtn}
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
