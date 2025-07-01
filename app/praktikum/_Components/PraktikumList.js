// app/praktikum/_Components/PraktikumList.js
"use client"; // Menandakan ini adalah Client Component

import { useState, useEffect } from "react";
import Search from "./search";
import PraktikumCard from "./PraktikumCard";

// Komponen ini menerima data awal sebagai prop
export default function PraktikumList({ initialData }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPrak, setFilteredPrak] = useState(initialData);

  // Efek ini akan berjalan setiap kali pengguna mengetik di kolom pencarian
  useEffect(() => {
    const filtered = initialData.filter(item =>
      // Memfilter berdasarkan judul, tidak case-sensitive
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPrak(filtered);
  }, [searchQuery, initialData]); // Bergantung pada searchQuery dan data awal

  return (
    <div>
      {/* Search Bar */}
      <Search onSearchChange={setSearchQuery} />

      {/* Grid Responsif untuk Daftar Praktikum */}
      {filteredPrak.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPrak.map((item) => (
            <PraktikumCard
              key={item.id}
              id={item.id}
              title={item.title}
              desc={item.desc}
              imageUrl={item.imageUrl} // Pastikan data Anda memiliki properti imageUrl
            />
          ))}
        </div>
      ) : (
        // Tampilan jika hasil pencarian tidak ditemukan
        <div className="text-center py-16 bg-slate-800 rounded-xl">
          <h3 className="text-xl font-semibold text-slate-200">Tidak Ditemukan</h3>
          <p className="mt-2 text-slate-400">
            {searchQuery 
              ? `Praktikum dengan nama "${searchQuery}" tidak dapat ditemukan.`
              : "Tidak ada data praktikum yang tersedia saat ini."
            }
          </p>
        </div>
      )}
    </div>
  );
}
