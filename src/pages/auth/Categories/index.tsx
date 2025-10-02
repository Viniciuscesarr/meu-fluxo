import { useState, useEffect, useCallback } from "react";
import HeaderAuth from "../../../components/HeaderAuth";
import { Plus, Edit, Trash2, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import api from "../../../api";

interface Categorie {
  id: number;
  name: string;
}

export default function Categories() {
  const [categories, setCategories] = useState<Categorie[]>([]);
  const [loading, setLoading] = useState(true);
  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Categorie | null>(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ name: "" });

  const token = localStorage.getItem("token");

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get("/categories", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCategories(res.data.dados ?? res.data);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleCreate = async () => {
    if (!form.name.trim()) return;
    setSaving(true);
    try {
      await api.post("/categories", { name: form.name }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCreateOpen(false);
      setForm({ name: "" });
      fetchCategories();
    } catch (e) {
      console.log(e);
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = async () => {
    if (!editingCategory || !form.name.trim()) return;
    setSaving(true);
    try {
      await api.put(`/category/${editingCategory.id}`, { name: form.name }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEditOpen(false);
      setEditingCategory(null);
      setForm({ name: "" });
      fetchCategories();
    } catch (e) {
      console.log(e);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Deseja excluir esta categoria?')) return;
    try {
      await api.delete(`/category/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchCategories();
    } catch (e) {
      console.log(e);
    }
  };

  const openEdit = (category: Categorie) => {
    setEditingCategory(category);
    setForm({ name: category.name });
    setEditOpen(true);
  };

  return (
    <>
      <HeaderAuth select1={false} select2={false} select3={false} select4={true} select5={false} />
      
      <div className="max-w-4xl mx-auto px-4 mt-20">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Link
              to="/auth/dashboard"
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              title="Voltar ao Dashboard"
            >
              <ArrowLeft size={20} className="text-gray-600" />
            </Link>
            <h1 className="text-2xl font-bold text-gray-800">Categorias</h1>
          </div>
          <button
            type="button"
            onClick={() => setCreateOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
          >
            <Plus size={20} />
            Nova Categoria
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md border border-gray-100">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-700">
                Lista de Categorias
              </h2>
              <span className="text-sm text-gray-500">
                {categories.length} categoria{categories.length !== 1 ? 's' : ''}
              </span>
            </div>

            {loading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin w-8 h-8 border-4 border-t-green-500 rounded-full"></div>
              </div>
            ) : categories.length === 0 ? (
              <div className="text-center py-12">
                <div className="mx-auto w-16 h-16 rounded-full bg-gray-100 border border-gray-200 mb-4 flex items-center justify-center">
                  <Plus size={24} className="text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-700 mb-2">
                  Nenhuma categoria encontrada
                </h3>
                <p className="text-gray-500 mb-4">
                  Comece criando sua primeira categoria
                </p>
                <button
                  type="button"
                  onClick={() => setCreateOpen(true)}
                  className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
                >
                  Criar Primeira Categoria
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categories.map((category) => (
                  <div
                    key={category.id}
                    className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-800 truncate">
                        {category.name}
                      </h3>
                      <div className="flex gap-1 ml-2">
                        <button
                          type="button"
                          onClick={() => openEdit(category)}
                          className="p-1.5 text-blue-500 hover:bg-blue-50 rounded transition-colors"
                          title="Editar categoria"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(category.id)}
                          className="p-1.5 text-red-500 hover:bg-red-50 rounded transition-colors"
                          title="Excluir categoria"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Modal Criar Categoria */}
        {createOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center" aria-modal="true" role="dialog">
            <div className="absolute inset-0 bg-black/50" onClick={() => setCreateOpen(false)} />
            <div className="relative bg-white rounded-lg shadow-lg w-11/12 max-w-md p-6" tabIndex={-1}>
              <h2 className="text-lg font-bold mb-4 text-gray-700">
                Nova Categoria
              </h2>
              <div className="flex flex-col gap-3">
                <input
                  type="text"
                  placeholder="Nome da categoria"
                  className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={form.name}
                  onChange={(e) => setForm({ name: e.target.value })}
                  onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
                  autoFocus
                />
                <div className="flex gap-2 mt-2">
                  <button
                    type="button"
                    className="flex-1 text-center bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 rounded-md transition-colors"
                    onClick={() => setCreateOpen(false)}
                    disabled={saving}
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    className="flex-1 text-center bg-green-500 hover:bg-green-600 text-white py-2 rounded-md disabled:opacity-60 transition-colors"
                    onClick={handleCreate}
                    disabled={saving || !form.name.trim()}
                  >
                    {saving ? "Criando..." : "Criar"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal Editar Categoria */}
        {editOpen && editingCategory && (
          <div className="fixed inset-0 z-50 flex items-center justify-center" aria-modal="true" role="dialog">
            <div className="absolute inset-0 bg-black/50" onClick={() => setEditOpen(false)} />
            <div className="relative bg-white rounded-lg shadow-lg w-11/12 max-w-md p-6" tabIndex={-1}>
              <h2 className="text-lg font-bold mb-4 text-gray-700">
                Editar Categoria
              </h2>
              <div className="flex flex-col gap-3">
                <input
                  type="text"
                  placeholder="Nome da categoria"
                  className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={form.name}
                  onChange={(e) => setForm({ name: e.target.value })}
                  onKeyDown={(e) => e.key === 'Enter' && handleEdit()}
                  autoFocus
                />
                <div className="flex gap-2 mt-2">
                  <button
                    type="button"
                    className="flex-1 text-center bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 rounded-md transition-colors"
                    onClick={() => setEditOpen(false)}
                    disabled={saving}
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    className="flex-1 text-center bg-green-500 hover:bg-green-600 text-white py-2 rounded-md disabled:opacity-60 transition-colors"
                    onClick={handleEdit}
                    disabled={saving || !form.name.trim()}
                  >
                    {saving ? "Salvando..." : "Salvar"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
