import supabase from "../config/supabase.js";

export const getGejala = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("gejala")
      .select("*")
      .order("kode_gejala", { ascending: true });

    if (error) throw error;

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};