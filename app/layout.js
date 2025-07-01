
import "./globals.css";
import Navbar from "./_Components/navbar";
import SideMenu from "./_Components/sidemenu";
export const metadata = {
  icons: {
    icon: [
      { url: '/icon.png', type: 'image/png' },
    ],
  },
  title: 'LABKOMJAR',
  description: 'Laboratorium Komputer & Jaringan',
}
export default function RootLayout({ children }) {

  // const showSideGal = pathname.startsWith("/galeri");

  return (
    <html lang="en">
      
      <body className="bg-slate-700 overflow-y-auto">
       
        {/* {showSideGal && <SideMenu />} */}
        <div>
          {children}
        </div>
      </body>
    </html>
  );
}
