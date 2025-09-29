import { LayoutDashboard, Settings, CircleUser, Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

interface Props {
  select1?: boolean;
  select2?: boolean;
  select3?: boolean;
}

export default function HeaderAuth(props: Props) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [prefsOpen, setPrefsOpen] = useState(false);
  const [currency, setCurrency] = useState<string>(() => localStorage.getItem('pref_currency') || 'BRL');
  const [dateFormat, setDateFormat] = useState<string>(() => localStorage.getItem('pref_datefmt') || 'pt-BR');

  const logout = () => {
    try { localStorage.removeItem('token'); } catch {}
    navigate('/login');
  };

  return (
    <header className="bg-[#15C64F] p-2 w-full flex items-center justify-between">
      <div>
        <Link to="/auth/dashboard">
          <h1 className="font-bold text-2xl md:text-3xl text-white m-2 hover:tracking-widest transition-all hover:cursor-pointer">
            MEU FLUXO
          </h1>
        </Link>
      </div>
      <nav className="hidden md:flex">
        <ul className="flex gap-8 text-white font-medium">
          <Link
            to="/auth/dashboard"
            className={`hover:cursor-pointer pb-1 ${
              props.select1 ? "border-b-4 border-white" : ""
            }`}
          >
            Dashboard
          </Link>
          <Link
            to="/auth/reports"
            className={`hover:cursor-pointer pb-1 ${
              props.select2 ? "border-b-4 border-white" : ""
            }`}
          >
            Relatórios
          </Link>
          <Link
            to="/auth/transactions"
            className={`hover:cursor-pointer pb-1 ${
              props.select3 ? "border-b-4 border-white" : ""
            }`}
          >
            Transações
          </Link>
        </ul>
      </nav>

      <div className="hidden md:flex gap-3 relative">
        <button onClick={() => navigate("/auth/dashboard")} title="Dashboard" aria-label="Dashboard">
          <LayoutDashboard
            size={28}
            className="text-white hover:scale-110 transition hover:cursor-pointer"
          />
        </button>
        <div className="relative">
          <button onClick={() => setSettingsOpen(!settingsOpen)} title="Configurações" aria-label="Configurações">
            <Settings
              size={28}
              className="text-white hover:scale-110 transition hover:cursor-pointer"
            />
          </button>
          {settingsOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white text-gray-700 rounded-md shadow-lg z-50 border border-gray-100">
              <button className="w-full text-left px-4 py-2 hover:bg-gray-50" onClick={() => { setSettingsOpen(false); navigate('/auth/profile'); }}>Perfil</button>
              <button className="w-full text-left px-4 py-2 hover:bg-gray-50" onClick={() => { setSettingsOpen(false); setPrefsOpen(true); }}>Preferências</button>
              <button className="w-full text-left px-4 py-2 hover:bg-gray-50" onClick={() => { setSettingsOpen(false); navigate('/auth/reports'); }}>Exportar dados</button>
              <button className="w-full text-left px-4 py-2 hover:bg-gray-50" onClick={() => { setSettingsOpen(false); navigate('/contato'); }}>Suporte</button>
              <div className="h-px bg-gray-100 my-1" />
              <button className="w-full text-left px-4 py-2 hover:bg-gray-50 text-red-600" onClick={() => { setSettingsOpen(false); logout(); }}>Sair</button>
            </div>
          )}
        </div>
        <button onClick={() => navigate("/auth/profile")} title="Perfil" aria-label="Perfil">
          <CircleUser
            size={28}
            className="text-white hover:scale-110 transition hover:cursor-pointer"
          />
        </button>
      </div>
      {prefsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setPrefsOpen(false)} />
          <div className="relative bg-white rounded-lg shadow-lg w-11/12 max-w-md p-6">
            <h2 className="text-lg font-bold mb-4 text-gray-700">Preferências</h2>
            <div className="flex flex-col gap-3">
              <label className="text-sm text-gray-600">Moeda padrão</label>
              <select className="border rounded px-3 py-2" value={currency} onChange={(e)=>setCurrency(e.target.value)}>
                <option value="BRL">Real (BRL)</option>
                <option value="USD">Dólar (USD)</option>
                <option value="EUR">Euro (EUR)</option>
              </select>
              <label className="text-sm text-gray-600">Formato de data</label>
              <select className="border rounded px-3 py-2" value={dateFormat} onChange={(e)=>setDateFormat(e.target.value)}>
                <option value="pt-BR">dd/mm/aaaa (pt-BR)</option>
                <option value="en-US">mm/dd/yyyy (en-US)</option>
              </select>
              <div className="flex gap-2 mt-2">
                <button type="button" className="flex-1 text-center bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 rounded-md" onClick={()=>setPrefsOpen(false)}>Cancelar</button>
                <button type="button" className="flex-1 text-center bg-green-500 hover:bg-green-600 text-white py-2 rounded-md" onClick={() => { localStorage.setItem('pref_currency', currency); localStorage.setItem('pref_datefmt', dateFormat); setPrefsOpen(false); }}>Salvar</button>
              </div>
            </div>
          </div>
        </div>
      )}
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden text-white p-2 focus:outline-none"
      >
        {open ? <X size={30} /> : <Menu size={30} />}
      </button>
      {open && (
        <div className="absolute top-16 left-0 w-full bg-[#15C64F] text-white flex flex-col items-center gap-6 py-6 shadow-lg md:hidden z-50">
          <Link
            to="/auth/dashboard"
            onClick={() => setOpen(false)}
            className={`hover:cursor-pointer pb-1 ${
              props.select1 ? "border-b-4 border-white" : ""
            }`}
          >
            Dashboard
          </Link>
          <Link
            to="/auth/reports"
            onClick={() => setOpen(false)}
            className={`hover:cursor-pointer pb-1 ${
              props.select2 ? "border-b-4 border-white" : ""
            }`}
          >
            Relatórios
          </Link>
          <Link
            to="/auth/transactions"
            onClick={() => setOpen(false)}
            className={`hover:cursor-pointer pb-1 ${
              props.select3 ? "border-b-4 border-white" : ""
            }`}
          >
            Transações
          </Link>
          <div className="flex gap-5 mt-4">
            <button onClick={() => { navigate('/auth/dashboard'); setOpen(false); }}>
              <LayoutDashboard size={28} className="text-white" />
            </button>
            <button onClick={() => { navigate('/auth/profile'); setOpen(false); }}>
              <Settings size={28} className="text-white" />
            </button>
            <button onClick={() => { navigate('/auth/profile'); setOpen(false); }}>
              <CircleUser size={28} className="text-white" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
