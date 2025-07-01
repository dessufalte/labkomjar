
import Dropdown from "../artikel/_Components/dropdownMenu";
import { IoTime, IoPerson } from "react-icons/io5";


const NewsSnipp = ({ title, up, down, desc, date, user, img_url }) => {
  return (
    <div className="bg-slate-700 rounded-lg border-[0.5px] border-slate-500">
      <div className="text-slate-100 font-semibold text-md news-header p-2 bg-slate-600 rounded-t-lg grid grid-cols-2 justify-between">
        <div className="grid grid-rows-2 px-2">
          <h1 className="text-sm">{user}</h1>
          <p className="text-xs font-extralight text-slate-300">{date}</p>
        </div>
        <div className="flex justify-end text-xs p-1.5 text-center align-middle">
          <Dropdown />
        </div>
      </div>
      <hr className="border-slate-400" />
      <div className="news-body text-slate-100 p-2 pl-3 text-sm">
        <h1 className="font-bold text-xl">{title}</h1>
        <hr className="border-slate-500 my-1" />

        {img_url && (
          <img className="h-44 mx-auto my-4" src={img_url} alt="Image" />
        )}

        <p>
          {desc}{" "}
          <a href="" className="text-blue-400">
            selengkapnya
          </a>
        </p>
      </div>
      <div className="grid grid-cols-2 justify-between text-slate-500 text-xs font-bold pl-1 pb-3 items-center">
        <div className="flex flex-row gap-2 pl-2 items-center">
          <IoTime />
          <p>{date}</p>
        </div>
        <div className="font-bold justify-end px-2 flex flex-row gap-2 items-center">
          <IoPerson />
          <p>{user}</p>
        </div>
      </div>
    </div>
  );
};

export default NewsSnipp;
