import supabase from "./config/supabase.js";

const GANGGUAN_DATA = [
  {
    kode_gangguan: "S1",
    nama: "Stress Ringan",
    deskripsi: "Tingkat stres ringan yang biasanya disebabkan oleh rutinitas harian, tenggat waktu tugas, atau ketegangan sementara. Ini wajar terjadi dan tidak mengganggu fungsi sehari-hari secara signifikan.",
    solusi: "Lakukan manajemen waktu yang baik, luangkan waktu untuk relaksasi atau hobi, olahraga teratur, tidur cukup, serta bicarakan keluh kesah dengan teman dekat."
  },
  {
    kode_gangguan: "S2",
    nama: "Stress Sedang",
    deskripsi: "Tingkat stres sedang di mana tekanan mulai menumpuk, menyebabkan keletihan fisik dan emosional. Stres ini mulai memengaruhi produktivitas kuliah dan fokus pengerjaan skripsi.",
    solusi: "Buat jadwal pengerjaan skripsi yang realistis (pecah menjadi tugas-tugas kecil), komunikasikan kendala dengan dosen pembimbing, batasi konsumsi kafein, praktikkan teknik pernapasan atau meditasi secara berkala, dan luangkan waktu untuk beristirahat tanpa layar gadget."
  },
  {
    kode_gangguan: "S3",
    nama: "Stress Berat",
    deskripsi: "Tingkat stres berat yang ditandai dengan kecemasan tinggi, keputusasaan, insomnia parah, atau penarikan diri secara sosial. Kondisi ini mengganggu aktivitas sehari-hari secara mendalam dan memerlukan perhatian khusus.",
    solusi: "Sangat dianjurkan untuk berkonsultasi dengan profesional kesehatan mental (psikolog atau psikiater). Lakukan jeda akademis jika diperlukan, ikuti konseling mahasiswa, terapkan self-care yang ketat, dan carilah support system terdekat untuk membantu Anda melewati fase ini."
  }
];

const GEJALA_DATA = [
  { kode_gejala: "G01", nama_gejala: "Kesulitan tidur (insomnia) atau tidur berlebihan", deskripsi: "Mengalami gangguan tidur seperti sulit memejamkan mata atau tidur terlalu lama." },
  { kode_gejala: "G02", nama_gejala: "Merasa lelah sepanjang waktu meskipun sudah beristirahat", deskripsi: "Keletihan fisik kronis meskipun tidak melakukan aktivitas fisik berat." },
  { kode_gejala: "G03", nama_gejala: "Sering mengalami sakit kepala atau pusing secara tiba-tiba", deskripsi: "Sakit kepala tegang yang sering muncul di sekitar dahi atau belakang kepala." },
  { kode_gejala: "G04", nama_gejala: "Ketegangan otot di bahu, leher, atau punggung", deskripsi: "Otot terasa kaku dan pegal akibat kecemasan atau postur duduk yang buruk." },
  { kode_gejala: "G05", nama_gejala: "Perubahan nafsu makan secara drastis", deskripsi: "Nafsu makan menurun tajam atau makan berlebihan secara emosional (emotional eating)." },
  { kode_gejala: "G06", nama_gejala: "Kesulitan berkonsentrasi atau fokus saat mengerjakan skripsi", deskripsi: "Pikiran mudah teralihkan dan sulit memahami materi bimbingan atau referensi." },
  { kode_gejala: "G07", nama_gejala: "Sering menunda-nunda pengerjaan tugas atau bimbingan skripsi", deskripsi: "Kecenderungan untuk menunda tugas akademik (prokrastinasi) karena rasa takut." },
  { kode_gejala: "G08", nama_gejala: "Merasa cemas, khawatir berlebih, atau panik", deskripsi: "Kecemasan intens terhadap masa depan, kelulusan, atau saat berhadapan dengan dosen." },
  { kode_gejala: "G09", nama_gejala: "Menjadi lebih mudah marah, tersinggung, atau sensitif terhadap kritik", deskripsi: "Emosi tidak stabil ketika mendapat masukan revisi atau saat berdiskusi." },
  { kode_gejala: "G10", nama_gejala: "Merasa sedih, murung, atau kehilangan minat pada aktivitas yang disukai", deskripsi: "Mood yang menurun terus menerus (depresi ringan) dan tidak bersemangat." },
  { kode_gejala: "G11", nama_gejala: "Merasa terbebani secara berlebihan oleh ekspektasi dosen atau orang tua", deskripsi: "Tekanan psikologis karena ingin memenuhi harapan orang lain." },
  { kode_gejala: "G12", nama_gejala: "Menarik diri dari interaksi sosial dengan teman atau keluarga", deskripsi: "Memilih menyendiri dan menghindari obrolan mengenai perkuliahan atau masa depan." },
  { kode_gejala: "G13", nama_gejala: "Mengalami jantung berdebar kencang saat memikirkan revisi atau sidang", deskripsi: "Reaksi kecemasan fisik berupa takikardia ringan." },
  { kode_gejala: "G14", nama_gejala: "Merasa ragu dengan kemampuan diri sendiri dan takut gagal menyelesaikan kuliah", deskripsi: "Krisis kepercayaan diri (imposter syndrome) terkait penyelesaian skripsi." },
  { kode_gejala: "G15", nama_gejala: "Sering merasa gelisah, tidak tenang, atau tidak bisa rileks", deskripsi: "Kondisi tidak tenang secara konstan meskipun sedang tidak mengerjakan tugas." }
];

// Mapping rules: JIKA gejala X MAKA gangguan Y dengan CF Pakar
const RULES_DATA = [
  // Stress Ringan (S1)
  { kode_gangguan: "S1", kode_gejala: "G01", cf_pakar: 0.4 },
  { kode_gangguan: "S1", kode_gejala: "G02", cf_pakar: 0.3 },
  { kode_gangguan: "S1", kode_gejala: "G03", cf_pakar: 0.3 },
  { kode_gangguan: "S1", kode_gejala: "G05", cf_pakar: 0.4 },
  { kode_gangguan: "S1", kode_gejala: "G07", cf_pakar: 0.5 },
  { kode_gangguan: "S1", kode_gejala: "G09", cf_pakar: 0.4 },

  // Stress Sedang (S2)
  { kode_gangguan: "S2", kode_gejala: "G01", cf_pakar: 0.6 },
  { kode_gangguan: "S2", kode_gejala: "G02", cf_pakar: 0.5 },
  { kode_gangguan: "S2", kode_gejala: "G06", cf_pakar: 0.7 },
  { kode_gangguan: "S2", kode_gejala: "G07", cf_pakar: 0.6 },
  { kode_gangguan: "S2", kode_gejala: "G08", cf_pakar: 0.6 },
  { kode_gangguan: "S2", kode_gejala: "G09", cf_pakar: 0.6 },
  { kode_gangguan: "S2", kode_gejala: "G11", cf_pakar: 0.7 },
  { kode_gangguan: "S2", kode_gejala: "G14", cf_pakar: 0.6 },
  { kode_gangguan: "S2", kode_gejala: "G15", cf_pakar: 0.5 },

  // Stress Berat (S3)
  { kode_gangguan: "S3", kode_gejala: "G01", cf_pakar: 0.8 },
  { kode_gangguan: "S3", kode_gejala: "G03", cf_pakar: 0.7 },
  { kode_gangguan: "S3", kode_gejala: "G04", cf_pakar: 0.8 },
  { kode_gangguan: "S3", kode_gejala: "G06", cf_pakar: 0.8 },
  { kode_gangguan: "S3", kode_gejala: "G08", cf_pakar: 0.8 },
  { kode_gangguan: "S3", kode_gejala: "G10", cf_pakar: 0.9 },
  { kode_gangguan: "S3", kode_gejala: "G12", cf_pakar: 0.8 },
  { kode_gangguan: "S3", kode_gejala: "G13", cf_pakar: 0.8 },
  { kode_gangguan: "S3", kode_gejala: "G14", cf_pakar: 0.9 },
  { kode_gangguan: "S3", kode_gejala: "G15", cf_pakar: 0.8 }
];

async function seed() {
  try {
    console.log("Starting seeding process...");

    // 1. Seed Gangguan
    console.log("Seeding 'gangguan'...");
    const { data: insertedGangguan, error: gError } = await supabase
      .from("gangguan")
      .upsert(GANGGUAN_DATA, { onConflict: "kode_gangguan" })
      .select();

    if (gError) throw gError;
    console.log(`Successfully seeded ${insertedGangguan.length} gangguan.`);

    // 2. Seed Gejala
    console.log("Seeding 'gejala'...");
    const { data: insertedGejala, error: gejError } = await supabase
      .from("gejala")
      .upsert(GEJALA_DATA, { onConflict: "kode_gejala" })
      .select();

    if (gejError) throw gejError;
    console.log(`Successfully seeded ${insertedGejala.length} gejala.`);

    // Map keys for rule creation
    const gangguanMap = {};
    insertedGangguan.forEach(g => {
      gangguanMap[g.kode_gangguan] = g.id;
    });

    const gejalaMap = {};
    insertedGejala.forEach(g => {
      gejalaMap[g.kode_gejala] = g.id;
    });

    // 3. Seed Rules
    console.log("Seeding 'rules'...");
    const formattedRules = RULES_DATA.map(rule => ({
      gangguan_id: gangguanMap[rule.kode_gangguan],
      gejala_id: gejalaMap[rule.kode_gejala],
      cf_pakar: rule.cf_pakar
    }));

    const { data: insertedRules, error: rError } = await supabase
      .from("rules")
      .upsert(formattedRules, { onConflict: "gangguan_id,gejala_id" })
      .select();

    if (rError) throw rError;
    console.log(`Successfully seeded ${insertedRules.length} rules.`);

    console.log("Database seeded successfully! 🌱");
  } catch (error) {
    console.error("Error seeding database:", error.message);
  }
}

seed();
