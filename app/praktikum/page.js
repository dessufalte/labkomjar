// app/praktikum/page.js

// Impor yang diperlukan
import Navbar from "../_Components/navbar";
import PraktikumList from "./_Components/PraktikumList";

// Fungsi untuk mengambil data dari API route internal kita
async function getPraktikumFromAPI() {
  // 1. Ambil base URL dari environment variable.
  // Jika tidak ada, gunakan string kosong untuk mencegah error.
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';
  
  // 2. Gabungkan base URL dengan path API untuk membuat URL absolut.
  const apiUrl = `/api/praktikum`;

  console.log(`[FETCH] Memanggil API di URL absolut: ${apiUrl}`);

  try {
    // Sekarang fetch akan menggunakan URL lengkap seperti 'http://localhost:3000/api/praktikum'
    const response = await fetch(apiUrl, { 
      cache: 'no-store' 
    });

    if (!response.ok) {
      throw new Error(`Gagal mengambil data dari API. Status: ${response.status}`);
    }

    return response.json();

  } catch (error) {
    // Log error yang lebih spesifik
    console.error("Error di dalam getPraktikumFromAPI:", error.message);
    return [];
  }
}


// Halaman ini tetap menjadi Server Component
export default async function Praktikum() {
  
  const listPrak = await getPraktikumFromAPI();
  console.log(listPrak)
  const dataWithImages = listPrak.map(item => ({
    ...item,
    imageUrl: item.img_url || '/galeri/lkj.png'
  }));

  return (
    <div className="bg-slate-900 min-h-screen text-white">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        
        <div className="text-center mb-10">
          <h1 className="font-bold text-4xl text-slate-100">Daftar Praktikum</h1>
          <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
            Jelajahi berbagai modul praktikum yang tersedia untuk meningkatkan keahlian teknis Anda di bidang komputer dan jaringan.
          </p>
        </div>

        <PraktikumList initialData={dataWithImages} />
        
      </div>
    </div>
  );
}
