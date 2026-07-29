import supabase from "../config/supabase.js";
import { hitungCF } from "../services/certaintyFactor.js";

export const diagnosis = async (req, res) => {
  try {
    const { gejala } = req.body;

    if (!gejala || !Array.isArray(gejala)) {
      return res.status(400).json({
        message: "Format request tidak valid. Harus menyertakan array 'gejala'."
      });
    }

    // 1. Ambil data gangguan dari database
    const { data: gangguanList, error: gError } = await supabase
      .from("gangguan")
      .select("*");

    if (gError) throw gError;

    // 2. Ambil data rules dari database
    const { data: rules, error: rError } = await supabase
      .from("rules")
      .select("*");

    if (rError) throw rError;

    // 3. Lakukan perhitungan Certainty Factor
    const hasilDiagnosis = hitungCF(gejala, rules, gangguanList);

    // 4. Simpan hasil diagnosis ke tabel public.diagnosis di Supabase
    // Catatan: Jika tabel diagnosis belum dibuat oleh user di SQL editor,
    // kita tangkap errornya secara anggun dan tetap mengembalikan hasil diagnosis ke user.
    try {
      const { error: dError } = await supabase
        .from("diagnosis")
        .insert({
          hasil: hasilDiagnosis.hasil,
          nilai_cf: hasilDiagnosis.nilai_cf
        });

      if (dError) {
        console.warn("Gagal menyimpan hasil diagnosis ke DB (Kemungkinan tabel 'diagnosis' belum dibuat):", dError.message);
      }
    } catch (dbErr) {
      console.warn("Gagal menyimpan diagnosis:", dbErr.message);
    }

    // 5. Kirim response hasil kalkulasi
    res.status(200).json({
      hasil: hasilDiagnosis.hasil,
      nilai_cf: hasilDiagnosis.nilai_cf,
      deskripsi: hasilDiagnosis.deskripsi,
      solusi: hasilDiagnosis.solusi,
      detail: hasilDiagnosis.detail
    });

  } catch (error) {
    console.error("Error pada proses diagnosis:", error);
    res.status(500).json({
      message: "Terjadi kesalahan internal server saat melakukan analisis.",
      error: error.message
    });
  }
};