

import Navbar from "../_Components/navbar";

import GalleryImageCard from "./_Components/GalleryImageCard"; 

export default function Galeri() {

  const staticGallery = [
    {
      id: 1,
      imageUrl: "/galeri/lkj.png",
      caption: "Kegiatan praktikum Jaringan Komputer.",
    },
    {
      id: 2,
      imageUrl: "/galeri/gambar-2.png",
      caption: "Sesi workshop Mikrotik bersama mahasiswa.",
    },
    {
      id: 3,
      imageUrl: "/galeri/gambar-3.jpg",
      caption: "Suasana di dalam laboratorium.",
    },
    {
      id: 4,
      imageUrl: "/galeri/gambar-4.jpg",
      caption: "Perakitan server untuk kebutuhan praktikum.",
    },
    {
      id: 5,
      imageUrl: "/galeri/gambar-5.jpg",
      caption: "Foto bersama setelah acara seminar.",
    },
    {
      id: 6,
      imageUrl: "/galeri/gambar-6.jpg",
      caption: "Peralatan baru di laboratorium.",
    },
    {
      id: 7,
      imageUrl: "/galeri/gambar-7.jpg",
      caption: "Mahasiswa sedang fokus mengerjakan modul.",
    },
    {
      id: 8,
      imageUrl: "/galeri/gambar-8.jpg",
      caption: "Presentasi hasil proyek akhir.",
    },
  ];

  return (
    <div className="bg-slate-900 min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="font-bold text-3xl text-slate-100">Galeri</h1>
          <p className="text-slate-400 mt-2">
            Dokumentasi berbagai kegiatan, praktikum, dan acara di laboratorium komputer dan jaringan.
          </p>
        </div>

        {/* Menampilkan galeri statis */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {staticGallery.map((image) => (
            <GalleryImageCard 
                key={image.id} 
                imageUrl={image.imageUrl} 
                caption={image.caption} 
            />
          ))}
        </div>
      </div>
    </div>
  );
}
