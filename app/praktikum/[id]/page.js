// app/praktikum/[id]/page.js

import Navbar from "@/app/_Components/navbar";
import Link from "next/link";
import { notFound } from "next/navigation";

// Fungsi untuk mengambil data dari API route dinamis kita
async function getPraktikumDetailFromAPI(id) {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";
  const apiUrl = `${baseUrl}/api/praktikum/${id}`;

  console.log(`[FETCH] Memanggil API detail di: ${apiUrl}`);

  try {
    const response = await fetch(apiUrl, { cache: "no-store" });

    if (response.status === 404) {
      return null;
    }

    if (!response.ok) {
      throw new Error(
        `Gagal mengambil data dari API. Status: ${response.status}`
      );
    }

    return response.json();
  } catch (error) {
    console.error("Error di getPraktikumDetailFromAPI:", error.message);
    return null;
  }
}

// Komponen Ikon untuk file modul
const ModuleIcon = () => (
  <svg
    className="w-6 h-6 text-cyan-400 flex-shrink-0"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    />
  </svg>
);

export default async function DetailPraktikum({ params }) {
  // --- PERBAIKAN DI SINI ---
  // Mengakses 'id' langsung dari 'params' tanpa destructuring.
  const id = params.id;

  // Mengambil data dengan memanggil API kita
  const praktikum = await getPraktikumDetailFromAPI(id);

  // Jika praktikum tidak ditemukan (API mengembalikan 404 atau error), tampilkan halaman 404
  if (!praktikum) {
    notFound();
  }

  return (
    <div className="bg-slate-900 min-h-screen text-white">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
        <nav className="mb-6 text-sm text-slate-400">
          <Link href="/praktikum" className="hover:text-white">
            Praktikum
          </Link>
          <span className="mx-2">/</span>
          <span className="text-white font-medium">{praktikum.title}</span>
        </nav>

        <div className="space-y-4 mb-10">
          <h1 className="font-bold text-4xl text-slate-100 tracking-tight">
            {praktikum.title}
          </h1>
          <p className="text-lg text-slate-400">{praktikum.desc}</p>
          <div className="flex flex-wrap gap-4 pt-4">
            <a
              href="#daftar-modul"
              className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-5 rounded-lg transition-colors"
            >
              Daftar Praktikum
            </a>
            <Link
              href="/jadwal"
              className="bg-slate-700 hover:bg-slate-600 text-slate-200 font-bold py-2 px-5 rounded-lg transition-colors"
            >
              Cek Jadwal
            </Link>
          </div>
        </div>

        <div id="daftar-modul" className="space-y-6">
          <h2 className="text-2xl font-bold text-white border-b border-slate-700 pb-3">
            Daftar Modul
          </h2>

          {praktikum.modul && praktikum.modul.length > 0 ? (
            <div className="space-y-3">
              {praktikum.modul.map((modul) => {
                const href = `/${encodeURIComponent(praktikum.title)}/Modul ${
                  modul.id
                }.pdf`;
                console.log("Generated href:", href);
                return (
                  <a
                    key={modul.id}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                    className="flex items-center space-x-4 p-4 bg-slate-800 rounded-lg border border-slate-700 hover:bg-slate-700/50 hover:border-slate-600 transition-all cursor-pointer"
                  >
                    <ModuleIcon />
                    <span className="flex-grow text-slate-200 font-medium">
                      {modul.judul_modul}
                    </span>
                    <svg
                      className="w-5 h-5 text-slate-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                      />
                    </svg>
                  </a>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12 bg-slate-800 rounded-lg">
              <p className="text-slate-400">
                Belum ada modul yang tersedia untuk praktikum ini.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
