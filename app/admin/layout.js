"use client";

import AdminNav from "./_component/navbar";

export default function AdminLayout({ children }) {
  const navitem = [
    { label: "Management", link: "/admin/users" },
    { label: "Keluar", link: "/" },
  ];
  return (
    <div className="">
      <AdminNav item={navitem} />
      <div className="bg-slate-500 overflow-y-auto ">
        <div className=" scroll-smooth pt-24 ">{children}</div>
      </div>
    </div>
  );
}
