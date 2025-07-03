
import "./globals.css";
export const metadata = {
  title: "LabKomJar", 
  description: "Situs resmi Laboratorium Komputer dan Jaringan FTI Unand.", 
  icons: {
    icon: [
      { url: '/icon.png', type: 'image/png' },
    ],
  },
  title: 'LABKOMJAR',
  description: 'Laboratorium Komputer & Jaringan',
}
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      
      <body className="bg-slate-700 overflow-y-auto">

        <div>
          {children}
        </div>
      </body>
    </html>
  );
}
