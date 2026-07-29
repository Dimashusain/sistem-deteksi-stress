/**
 * Menghitung Certainty Factor (CF) berdasarkan gejala yang dialami user,
 * basis aturan (rules) pakar, dan daftar gangguan yang ada.
 * 
 * @param {Array} gejalaUser - Array dari { id, cf_user }
 * @param {Array} rules - Array dari { gangguan_id, gejala_id, cf_pakar }
 * @param {Array} gangguanList - Array dari { id, kode_gangguan, nama, deskripsi, solusi }
 * @returns {Object} Hasil diagnosis dengan nilai CF tertinggi
 */
export const hitungCF = (gejalaUser, rules, gangguanList) => {
  // 1. Buat map keyakinan user berdasarkan gejala_id
  const userCFMap = new Map();
  gejalaUser.forEach(item => {
    if (item.id && item.cf_user !== undefined) {
      userCFMap.set(String(item.id), parseFloat(item.cf_user));
    }
  });

  // 2. Kelompokkan rules berdasarkan gangguan_id
  const rulesByGangguan = {};
  gangguanList.forEach(g => {
    rulesByGangguan[g.id] = [];
  });

  rules.forEach(rule => {
    if (rulesByGangguan[rule.gangguan_id]) {
      rulesByGangguan[rule.gangguan_id].push(rule);
    }
  });

  // 3. Hitung CF untuk setiap gangguan
  const hasilKalkulasi = gangguanList.map(g => {
    const rulesForThis = rulesByGangguan[g.id] || [];
    let cfCombine = 0.0;
    let isFirst = true;

    rulesForThis.forEach(rule => {
      const cfUser = userCFMap.get(String(rule.gejala_id));
      
      // Jika user mengisi gejala ini dan memiliki nilai keyakinan > 0
      if (cfUser !== undefined && cfUser > 0) {
        // CF(H,E) = CF(E) * CF(rule)
        const cfRule = cfUser * parseFloat(rule.cf_pakar);

        if (isFirst) {
          cfCombine = cfRule;
          isFirst = false;
        } else {
          // Rumus kombinasi CF: CF_combine = CF_old + CF_new * (1 - CF_old)
          cfCombine = cfCombine + cfRule * (1 - cfCombine);
        }
      }
    });

    return {
      id: g.id,
      kode_gangguan: g.kode_gangguan,
      nama: g.nama,
      deskripsi: g.deskripsi,
      solusi: g.solusi,
      nilai_cf: Math.min(Math.max(cfCombine, 0.0), 1.0) // Pastikan dalam range [0, 1]
    };
  });

  // 4. Urutkan dari nilai CF terbesar
  hasilKalkulasi.sort((a, b) => b.nilai_cf - a.nilai_cf);

  // Jika semua nilai CF adalah 0 (tidak ada gejala yang dipilih sama sekali)
  const allZero = hasilKalkulasi.every(h => h.nilai_cf === 0);
  if (allZero) {
    const stressRingan = hasilKalkulasi.find(h => h.kode_gangguan === "S1") || hasilKalkulasi[0];
    return {
      hasil: "Tidak Ada Stress",
      nilai_cf: 0.0,
      deskripsi: "Anda tidak menunjukkan gejala stres yang signifikan berdasarkan kuesioner. Pertahankan kesehatan mental Anda!",
      solusi: "Tetap luangkan waktu untuk istirahat, kelola waktu belajar dengan baik, dan lakukan hobi yang menyenangkan secara berkala.",
      detail: hasilKalkulasi
    };
  }

  // Ambil hasil diagnosis dengan CF tertinggi
  const highest = hasilKalkulasi[0];

  return {
    hasil: highest.nama,
    nilai_cf: parseFloat(highest.nilai_cf.toFixed(4)), // Bulatkan ke 4 desimal
    deskripsi: highest.deskripsi,
    solusi: highest.solusi,
    detail: hasilKalkulasi.map(h => ({
      ...h,
      nilai_cf: parseFloat(h.nilai_cf.toFixed(4))
    }))
  };
};