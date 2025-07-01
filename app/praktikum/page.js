// app/praktikum/page.js

import Navbar from "../_Components/navbar";
import PraktikumList from "./_Components/PraktikumList";

// Fungsi untuk mengambil data dari API route internal
async function getPraktikumFromAPI() {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';
  const apiUrl = `https://labkomjar.vercel.app/api/praktikum`;

  try {
    const response = await fetch(apiUrl, {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Gagal mengambil data. Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Gagal fetch data praktikum:", error.message);
    return [];
  }
}

export default async function Praktikum() {
  const listPrak = await getPraktikumFromAPI();

  const dataWithImages = listPrak.map(item => ({
    ...item,
    imageUrl: item.img_url || '/galeri/lkj.png',
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
