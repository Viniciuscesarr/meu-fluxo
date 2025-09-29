import { useEffect, useState } from "react";
import HeaderAuth from "../../../components/HeaderAuth";
import api from "../../../api";

interface User { name: string; email: string }

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchUser = async () => {
      try {
        const res = await api.get("/user", { headers: { Authorization: `Bearer ${token}` } });
        setUser(res.data);
      } catch (e) {
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  return (
    <>
      <HeaderAuth select1={false} select2={false} select3={false} />
      <div className="max-w-3xl mx-auto px-4 mt-20">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Perfil</h1>
        <div className="bg-white border border-gray-100 rounded-lg shadow p-6">
          {loading ? (
            <p className="text-gray-400">Carregando...</p>
          ) : (
            <div className="space-y-2 text-gray-700">
              <div><span className="text-sm text-gray-500">Nome: </span><strong>{user?.name}</strong></div>
              <div><span className="text-sm text-gray-500">Email: </span><strong>{user?.email}</strong></div>
            </div>
          )}
          <div className="mt-6">
            <button
              type="button"
              onClick={async () => {
                try {
                  const token = localStorage.getItem("token");
                  await api.post("/logout", null, { headers: { Authorization: `Bearer ${token}` } });
                } catch (e) {
                  // ignore
                } finally {
                  localStorage.removeItem("token");
                  window.location.href = "/login";
                }
              }}
              className="px-4 py-2 rounded bg-red-500 hover:bg-red-600 text-white"
            >
              Sair
            </button>
          </div>
        </div>
      </div>
    </>
  );
}


