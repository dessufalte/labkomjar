export default function AdminLogin() {
  return (
    <div className="bg-slate-600 h-[80vh] flex flex-col items-center justify-center">
      <div className="bg-slate-700 w-96 pt-6 rounded-t-lg border-t-[1px] border-slate-500 border-x-[1px]">
        <h2 className="text-2xl font-bold text-center text-white mb-6">
          Login
        </h2>
      </div>
      <div className="bg-slate-600 p-10 border-b-[1px] border-slate-500 border-x-[1px] rounded-b-lg w-96">
        {/* Form Login */}
        <form>
          <div className="mb-4 ">
            <label htmlFor="username" className="block text-sm text-slate-300">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="w-full p-3 mt-1 bg-slate-500 text-white rounded-md outline-none "
              placeholder="Username"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm text-slate-300">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-3 mt-1 bg-slate-500 text-white rounded-md outline-none "
              placeholder="Password"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-slate-700 text-white font-semibold rounded-md hover:bg-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500"
          >
            Login
          </button>
        </form>

      </div>
    </div>
  );
}
