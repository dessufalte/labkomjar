import ThreeLayout from "../_Components/threelayout";
import ListLayout from "../_Components/listlayout";
import ProjectSnipp from "./_Components/projectsnip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { fetchProjek } from "@/lib/data";
import Navbar from "../_Components/navbar";

export default async function Projek() {
  const projects = await fetchProjek();
  return (
    <div className="bg-slate-700 w-full h-screen">
      <Navbar />
      <ThreeLayout>
        <div className=""></div>
        <ListLayout>
          <h1 className="font-semibold text-2xl text-slate-200">
            Research & Projects
          </h1>
          <p className="text-sm">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores
            obcaecati perferendis, pariatur, quasi sequi officia nobis quia,
            fugit similique molestiae dolor. Accusantium voluptatum id earum
            necessitatibus deserunt iste eveniet asperiores.
          </p>
          <div className="pl-2">
            <input
              type="text"
              className="outline-none p-2 px-5 w-3/5 bg-opacity-80 text-white bg-slate-600 focus:bg-slate-500 transition-all ease-out text-sm border-b"
              placeholder="Cari Projek..."
            />
            <button className="text-sm align-middle bg-slate-600 bg-opacity-80 hover:bg-slate-500 border-b transition-all ease-out text-white p-2 h-full">
              <FontAwesomeIcon className="w-3 h-4" icon={faSearch} />
            </button>
          </div>
          {projects.map((index) => (
            <ProjectSnipp
              key={index.id}
              title={index.title}
              people={index.developer}
              desc={index.desc}
              date={index.createdAt.toDateString()}
              link={index.url}
              lang={index.lang}
            />
          ))}
        </ListLayout>
      </ThreeLayout>
    </div>
  );
}
