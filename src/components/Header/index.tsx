import { useState } from "react";
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";

export default function Header() {
  const [Open, setOpen] = useState(false);

  return (
    <>
      <header className="flex min-w-full items-center">
        <div>
          <Link to="/">
            <h1 className="text-[#265700] font-bold text-3xl m-5 hover:tracking-widest transition-all hover:cursor-pointer">
              MEU FLUXO
            </h1>
          </Link>
        </div>
        <div className="m-auto">
          <ul className="gap-3 text-[#A7A2A2] hidden md:flex">
            <Link
              to="/sobre-nos"
              className="hover:brightness-75 hover:cursor-pointer"
            >
              Quem somos
            </Link>
            <Link
              to="/contato"
              className="hover:brightness-75 hover:cursor-pointer"
            >
              Contato
            </Link>
            <Link
              to="/planos"
              className="hover:brightness-75 hover:cursor-pointer"
            >
              Planos
            </Link>
          </ul>
        </div>
        <div className="mr-5 hidden md:flex gap-3">
          <button>
            <Link
              to="/login"
              className="text-[#265700] font-medium hover:cursor-pointer"
            >
              Login
            </Link>
          </button>
          <button className="text-white bg-[#09B900] p-2 rounded hover:brightness-75 hover:cursor-pointer">
            Comece Hoje!
          </button>
        </div>
        <div className="m-3">
          <Menu
            size="34px"
            className="md:hidden"
            onClick={() => setOpen(!Open)}
          />
        </div>
        {Open && (
          <div className="absolute top-20 left-0 w-full bg-white shadow-md flex flex-col items-center gap-5 py-6 md:hidden">
            <ul className="flex flex-col gap-4">
              <Link to="/sobre-nos" className="text-[#A7A2A2] hover:brightness-75 cursor-pointer">
                Quem somos
              </Link>
              <Link to="/contato" className="text-[#A7A2A2] hover:brightness-75 cursor-pointer">
                Contato
              </Link>
              <Link to="/planos" className="text-[#A7A2A2] hover:brightness-75 cursor-pointer">
                Planos
              </Link>
            </ul>
            <div className="flex flex-col gap-3 w-3/4">
              <button className="text-[#265700] font-semibold border py-2 rounded">
                Login
              </button>
              <button className="bg-[#09B900] hover:brightness-75 text-white py-2 rounded">
                Comece Hoje!
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
