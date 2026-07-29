const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export interface Gejala {
  id: string | number;
  kode_gejala: string;
  nama_gejala: string;
  deskripsi?: string;
  created_at?: string;
}

export interface GejalaInput {
  id: string | number;
  cf_user: number;
}

export interface DiagnosisDetail {
  id: string | number;
  kode_gangguan: string;
  nama: string;
  deskripsi: string;
  solusi: string;
  nilai_cf: number;
}

export interface DiagnosisResponse {
  hasil: string;
  nilai_cf: number;
  deskripsi: string;
  solusi: string;
  detail: DiagnosisDetail[];
}

export const getGejala = async (): Promise<Gejala[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/gejala`);
    if (!response.ok) {
      throw new Error(`Gagal mengambil data gejala: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("API Error (getGejala):", error);
    throw error;
  }
};

export const submitDiagnosis = async (gejala: GejalaInput[]): Promise<DiagnosisResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/diagnosis`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ gejala }),
    });

    if (!response.ok) {
      throw new Error(`Gagal memproses diagnosis: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("API Error (submitDiagnosis):", error);
    throw error;
  }
};
