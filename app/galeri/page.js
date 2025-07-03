

import Navbar from "../_Components/navbar";

import GalleryImageCard from "./_Components/GalleryImageCard"; 

export default function Galeri() {

  const staticGallery = [
    {
      id: 1,
      imageUrl: "/galeri/lkj.png",
      caption: " Laboratorium Jaringan Komputer.",
    },
    {
      id: 2,
      imageUrl: "/galeri/2.jpeg",
      caption: "Pelatihan Asisten Magang",
    },
    {
      id: 3,
      imageUrl: "/galeri/3.jpeg",
      caption: "Pelatihan Asisten Magang",
    },
    {
      id: 4,
      imageUrl: "/galeri/4.jpeg",
      caption: "Ruangan LKJ",
    },
    {
      id: 5,
      imageUrl: "/galeri/5.jpeg",
      caption: "Foto bersama setelah Presentasi Akhir Asisten Magang.",
    },
    {
      id: 6,
      imageUrl: "/galeri/6.jpeg",
      caption: "Foto bersama rapat koordinasi dosen pembimbing",
    },
    {
      id: 7,
      imageUrl: "/galeri/7.jpeg",
      caption: "Foto bersama asisten magang",
    },
    {
      id: 8,
      imageUrl: "/galeri/8.jpeg",
      caption: "Foto bersama Forum Perdana LKJ 2024",
    },
    {
      id: 9,
      imageUrl: "/galeri/9.jpeg",
      caption: "Penyerahan Koordinator Dasar.",
    },
    {
      id: 10,
      imageUrl: "/galeri/10.jpeg",
      caption: "Ujian penerimaan asisten magang.",
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
