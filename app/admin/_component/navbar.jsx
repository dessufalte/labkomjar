import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const AdminNav = ({ item }) => {
  const pathname = usePathname();

  const isRootAdmin = pathname === "/admin";

  const rootAdminItems = [{ label: "Keluar", link: "/" }];

  return (
    <div className="fixed w-full">
      <div className="grid grid-rows-2 justify-center w-full pt-4 border-b-2 border-slate-500 bg-slate-800">
        <div className="flex justify-center items-center mb-3">
          <Image
            src="/adkj.png"
            width={200}
            height={100}
            className="object-contain"
            alt="Admin Logo"
          />
        </div>

        {isRootAdmin ? (
          <div className="flex flex-row bg-slate-700 text-sm font-semibold text-slate-300 gap-2 px-2 rounded-t-md items-center justify-center">
            {rootAdminItems.map((i, index) => (
              <Link href={i.link} key={index}>
                <div
                  className={`rounded-md p-2 hover:bg-slate-400 hover:text-slate-700`}
                >
                  {i.label}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex flex-row bg-slate-700 text-sm font-semibold text-slate-300 gap-2 px-2 rounded-t-md">
            {item.map((i, index) => (
              <Link href={i.link} key={index}>
                <div
                  className={`rounded-md p-2 ${
                    pathname === i.link
                      ? "bg-cyan-500 text-slate-700"
                      : "hover:bg-slate-400 hover:text-slate-700"
                  }`}
                >
                  {i.label}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminNav;
