import Header from "../../components/Header";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../../api";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("As senhas não coincidem!");
      return;
    }

    try {
      const response = await api.post("/register", {
        name,
        email,
        password,
        password_confirmation: confirmPassword,
      });

      console.log("Usuário registrado:", response.data);

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }

      navigate("/login");
    } catch (err: any) {
      console.error("Erro ao registrar:", err.response?.data || err.message);
      setError("Erro ao registrar usuário. Verifique os dados.");
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
            Registro
          </h2>

          {error && (
            <p className="text-red-600 text-center mb-4 font-medium">{error}</p>
          )}

          <label className="block mb-2 text-[#A7A2A2] font-medium">Nome</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Digite seu nome"
            className="w-full p-3 mb-6 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#09B900]"
            required
          />

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
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Digite sua senha"
            className="w-full p-3 mb-6 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#09B900]"
            required
          />

          <label className="block mb-2 text-[#A7A2A2] font-medium">
            Confirmar Senha
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirme sua senha"
            className="w-full p-3 mb-6 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#09B900]"
            required
          />

          <button
            type="submit"
            className="w-full bg-[#09B900] text-white font-semibold py-3 rounded hover:brightness-90 transition-all"
          >
            Cadastrar
          </button>

          <p className="text-center text-sm text-[#A7A2A2] mt-4">
            Já tem conta?{" "}
            <Link
              to="/login"
              className="text-[#265700] font-medium hover:underline"
            >
              Entrar
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}
