import Header from "../../components/Header";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../../api"; // axios configurado
import { Eye } from "lucide-react"

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [viewPassword ,setViewPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setError("");

  try {
    const response = await api.post("/login", { headers: { "Accept": "Aplication/json" },
      email,
      password,
    });

    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      navigate("/auth/dashboard");
    }
  } catch (err: any) {
    if (err.response) {
      if (err.response.data.error) {
        setError(err.response.data.error);
      } else if (err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Erro inesperado no login.");
      }
    } else {
      setError("Erro de conexão com o servidor.");
    }
  }
};

  return (
    <>
      <Header />
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-10 rounded-xl shadow-md w-full max-w-md"
        >
          <h2 className="text-3xl font-bold text-[#265700] mb-8 text-center">
            Login
          </h2>

          {error && (
            <p className="mb-4 text-red-600 font-medium text-center">{error}</p>
          )}

          <label className="block mb-2 text-[#A7A2A2] font-medium">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Digite seu email"
            className="w-full p-3 mb-6 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#09B900]"
            required
          />

          <label className="block mb-2 text-[#A7A2A2] font-medium">Senha</label>
          <div className="flex">
            <input
            type={viewPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Digite sua senha"
            className="w-full p-3 mb-6 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#09B900]"
            required
          />
          <Eye className="text-gray-300 hover:cursor-pointer" onClick={() => setViewPassword(!viewPassword)}/>
          </div>

          <button
            type="submit"
            className="w-full bg-[#09B900] text-white font-semibold py-3 rounded hover:brightness-90 transition-all"
          >
            Entrar
          </button>

          <p className="text-center text-sm text-[#A7A2A2] mt-4">
            Não tem conta?{" "}
            <Link
              to="/register"
              className="text-[#265700] font-medium hover:underline"
            >
              Cadastre-se
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}
