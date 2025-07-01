import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const buttonClicked =
    "hover:bg-slate-500 hover:animate-pulse hover:cursor-pointer py-1 hover:text-white bg-teal-200 text-slate-600 rounded-md px-2 ";
  const buttonUnClicked =
    "rounded-md hover:cursor-pointer hover:bg-slate-500 hover:text-white py-1";
  const menuList = [
    { name: "Home", path: "/" },
    { name: "Profil", path: "/profil" },
    { name: "Praktikum", path: "/praktikum" },
    { name: "Galeri", path: "/galeri" },
    { name: "Artikel", path: "/artikel" },
    { name: "Dokumen", path: "/dokumen" },
  ];
  const [isBtnClicked, setBtnClicked] = useState(5);
  const handleClick = (index) => {
    setBtnClicked(index);
  };
  return (
    <nav className="flex flex-wrap justify-between items-center from-slate-950 bg-gradient-to-r to-slate-800  text-white border-b-2 border-slate-500">
      <div className="py-3 pl-4 flex flex-wrap items-center">
        <img
          className="h-8"
          src="http://lkj.sk.fti.unand.ac.id/IMG_4119%20copy.PNG"
          alt=""
        />
        <div className="grid grid-rows-2 ml-2 items-center">
          <span className="font-bold text-xs text-yellow-200">
            LABORATORIUM
          </span>
          <span className="font-semibold self-center text-sm">
            Komputer dan Jaringan
          </span>
        </div>
      </div>
      <div className="">
        <ul className="grid text-center font-semibold grid-cols-6 gap-5 bg-slate-700 mr-3 rounded-md text-xs py-1 px-10 w-[40rem]">
          {menuList.reverse().map((item, index) => (
            <Link to={item.path}>
              <li
                key={index}
                onClick={() => handleClick(index)}
                className={
                  isBtnClicked === index ? buttonClicked : buttonUnClicked
                }
              >
                {item.name}
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
