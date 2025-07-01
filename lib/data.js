// lib/data.js
import prisma from "@/lib/prima";

// --- FUNGSI BARU: Mengambil SEMUA praktikum ---
// Gunakan ini untuk memuat daftar awal di halaman Anda.
export const fetchAllPrak = async () => {
  console.log("[DEBUG] Memulai fetchAllPrak...");
  try {
    // findMany() tanpa 'where' akan mengambil semua record.
    const praktikum = await prisma.prak.findMany({
      orderBy: {
        title: 'asc' // Urutkan berdasarkan judul agar konsisten
      }
    });
    console.log(`[DEBUG] fetchAllPrak berhasil, ditemukan ${praktikum.length} item.`);
    return praktikum;
  } catch (error) {
    console.error("--- ERROR di fetchAllPrak ---", error);
    // Kembalikan array kosong jika gagal, agar aplikasi tidak crash.
    // Log di atas akan memberi tahu Anda apa masalahnya di terminal server.
    return [];
  }
};

// --- FUNGSI LAMA (diperbaiki): Untuk MENCARI praktikum ---
// Fungsi ini sekarang memiliki tujuan yang jelas.
export const searchPrak = async (query) => {
  // Jika query kosong, tidak perlu ke database, kembalikan array kosong.
  if (!query) {
    return [];
  }
  console.log(`[DEBUG] Memulai searchPrak dengan query: "${query}"`);
  try {
    const praktikum = await prisma.prak.findMany({
      where: {
        title: {
          contains: query,
          mode: "insensitive"
        }
      }
    });
    return praktikum;
  } catch (error) {
    console.error(`--- ERROR di searchPrak dengan query "${query}" ---`, error);
    return [];
  }
};


// --- Fungsi-fungsi lain (tidak perlu diubah, tapi ada baiknya ditambahkan error handling) ---

export const fetchGambar = async () => {
  try {
    const Imgs = await prisma.image.findMany();
    return Imgs;
  } catch (error) {
    console.error("--- ERROR di fetchGambar ---", error);
    throw new Error("Gagal mengambil data gambar");
  }
};

export const fetchArtikel = async () => {
  try {
    const data = await prisma.post.findMany({ include: { author: true } });
    return data;
  } catch (error) {
    console.error("--- ERROR di fetchArtikel ---", error);
    throw new Error("Gagal mengambil data artikel");
  }
};

export const fetchPraktikumModules = async (praktikumId) => {
  if (!praktikumId) return null;
  try {
    // Gunakan findUnique karena Anda mencari berdasarkan ID unik
    const praktikum = await prisma.prak.findUnique({
      where: {
        id: praktikumId, // ID biasanya string atau number, tidak perlu parseInt jika sudah benar tipenya
      },
      include: { modul: true }
    });
    return praktikum;
  } catch (error) {
    console.error(`--- ERROR di fetchPraktikumModules untuk ID ${praktikumId} ---`, error);
    throw new Error("Gagal mengambil data modul");
  }
};

// ...fungsi lainnya...
