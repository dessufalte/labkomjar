const HomeFooter = () => {
  return (
    <div className="border-t-[1px] border-slate-600 p-4 flex flex-row h-full">
      <div className="flex flex-row gap-4 p-4 items-center">
        <img
          className="h-20 w-20"
          src="lkj.png"
          alt=""
        />
        <div className="text-white">
          <h1>Laboratorium Komputer dan Jaringan</h1>
          <h1>Fakultas Teknologi Informasi</h1>
          <h1>Universitas Andalas</h1>
        </div>
        <div className="text-slate-500  border-slate-600 border-l-2 h-full py-1 px-2 gap-2 ">
          <p>Contact details: </p>
          <div className="grid grid-rows-1 font-semibold gap-1">
            <a className="flex flex-row items-center gap-2" href="">
              <i className="fab fa-facebook"></i>
              <p>Labor Komputer dan Jaringan</p>
            </a>
            <a className="flex flex-row items-center gap-2" href="">
              <i className="fab fa-instagram"></i>
              <p>@lkjunand</p>
            </a>
            <a className="flex flex-row items-center gap-2" href="">
              <i className="fab fa-youtube"></i>
              <p>Labor Komputer dan Jaringan</p>
            </a>
            <a className="flex flex-row items-center gap-2" href="">
              <i className="fab fa-twitter"></i>
              <p>Labor Komputer dan Jaringan</p>
            </a>
            <a className="flex flex-row items-center gap-2" href="">
              <i className="fab fa-twitch"></i>
              <p>Labor Komputer dan Jaringan</p>
            </a>
          </div>
        </div>
        <div className="text-amber-200 items-start">
            <p>Email kami : </p>
        </div>
      </div>
    </div>
  );
};
export default HomeFooter;
