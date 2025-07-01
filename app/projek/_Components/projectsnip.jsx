import Link from "next/link";
const ProjectSnipp = ({ title, people, date, link, desc, lang }) => {
  return (
    <div className="bg-slate-600 p-2 rounded-md border border-slate-500">
      <div className="header-p">
        <h1 className="font-semibold">
          {people}/
          <Link className="text-blue-500" href={link}>
            {title}
          </Link>
        </h1>
      </div>
      <div className="body-p text-sm mb-2 text-slate-300">
        <p>{desc}</p> <div className="align-middle h-full text-slate-400 text-xs">{date}</div>
      </div>
      <div className="flex-row justify-between pr-2 flex">
        <div className="flex flex-row gap-2 h-6 text-center align-middle text-xs">
          <div className="bg-cyan-600 p-1 rounded-lg h-full">{lang}</div>
        </div>
        <Link href={link}>
          <div className="bg-blue-600 p-1 rounded-md text-xs ">Lihat</div>
        </Link>
      </div>
    </div>
  );
};

export default ProjectSnipp;
