// pages/projects.js atau app/projects/page.js
import ThreeLayout from "../_Components/threelayout";
import ListLayout from "../_Components/listlayout";
import Navbar from "../_Components/navbar";
import { getRepositories } from "../lib/github";
import GitHubRepoCard from "./_Components/GitHubRepoCard";
import GitHubStats from "./_Components/GitHubStats";

const BeritaArtikel = async () => {
  if (process.env.IN_DEV === "1") {
    return (
      <div className="bg-slate-700 w-full min-h-screen">
        <Navbar />
        <div className="flex flex-col items-center justify-center h-[calc(100vh-80px)] text-center px-4">

          <svg 
            className="w-16 h-16 text-cyan-400 mb-6 animate-spin" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <h1 className="text-3xl font-bold text-slate-100 mb-2">
            Halaman dalam Pengembangan
          </h1>
          <p className="text-slate-400 max-w-md">
            Komponen lain pada halaman ini disembunyikan sementara untuk mempercepat proses development. Konten akan tampil kembali secara otomatis pada versi produksi.
          </p>
        </div>
      </div>
    );
  }

  // --- Kode Asli Anda Akan Berjalan di Lingkungan Produksi ---
  const repositories = await getRepositories();
  
  // Calculate stats
  const totalStars = repositories.reduce((sum, repo) => sum + repo.stargazers_count, 0);
  const totalForks = repositories.reduce((sum, repo) => sum + repo.forks_count, 0);
  const languages = [...new Set(repositories.map(repo => repo.language).filter(Boolean))];
  
  const featuredRepos = repositories.slice(0, 6);
  const otherRepos = repositories.slice(6);

  return (
    <div className="bg-slate-700 w-full min-h-screen">

    </div>
  );
};

export default BeritaArtikel;
