// app/praktikum/page.js

// Impor yang diperlukan
import Navbar from "../_Components/navbar";
import PraktikumList from "./_Components/PraktikumList";

// Fungsi untuk mengambil data dari API route internal kita
// Hilangkan fetch
async function getPraktikumFromAPI() {
  const data = await prisma.Prak.findMany({
    orderBy: { id: "asc" },
  });
  return data;
}

// Halaman ini tetap menjadi Server Component
export default async function Praktikum() {
  
  const listPrak = await getPraktikumFromAPI();
  
  // Menambahkan properti imageUrl ke setiap item untuk digunakan di komponen client
  const dataWithImages = listPrak.map(item => ({
    ...item,
    // Jika item.img_url tidak ada, gunakan gambar default
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

        {/* Melewatkan data yang sudah diproses ke komponen client */}
        <PraktikumList initialData={dataWithImages} />
        
      </div>
    </div>
  );
}
