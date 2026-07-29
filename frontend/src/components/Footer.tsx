import Link from "next/link";
import { Shield } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 mt-auto border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Identity */}
        <div className="flex flex-col space-y-4">
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-accent/15 text-accent p-2 rounded-xl">
              <Shield className="w-5 h-5" />
            </div>
            <span className="font-sans font-bold text-lg text-white">
              Serene<span className="text-accent">Check</span>
            </span>
          </Link>
          <p className="text-sm text-slate-400 font-sans max-w-xs">
            Sistem Pakar skrining awal tingkat stres mahasiswa tingkat akhir menggunakan metode Certainty Factor (CF).
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-col space-y-3">
          <span className="text-white font-semibold text-sm font-sans tracking-wider uppercase">
            Tautan Cepat
          </span>
          <nav className="flex flex-col space-y-2 text-sm">
            <Link href="/" className="hover:text-white transition-colors duration-200">
              Beranda
            </Link>
            <Link href="/diagnosis" className="hover:text-white transition-colors duration-200">
              Mulai Diagnosis
            </Link>
            <Link href="/tentang" className="hover:text-white transition-colors duration-200">
              Tentang Penelitian
            </Link>
          </nav>
        </div>

        {/* Disclaimer */}
        <div className="flex flex-col space-y-3">
          <span className="text-white font-semibold text-sm font-sans tracking-wider uppercase">
            Pemberitahuan Medis
          </span>
          <p className="text-xs text-slate-500 font-sans leading-relaxed">
            SereneCheck merupakan media skrining awal berbasis sistem pakar dan bukan pengganti diagnosis profesional oleh psikolog atau psikiater. Apabila Anda mengalami gejala yang mengganggu aktivitas sehari-hari, segera konsultasikan dengan tenaga kesehatan mental.
          </p>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-6 mt-10 pt-6 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500">
        <p>
          &copy; {new Date().getFullYear()} SereneCheck. Seluruh hak cipta dilindungi.
        </p>
        <p className="mt-2 md:mt-0 font-medium">
          Dibuat untuk Implementasi Penelitian & Skripsi Akademik
        </p>
      </div>
    </footer>
  );
}
