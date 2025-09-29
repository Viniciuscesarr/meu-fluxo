import { useEffect, useMemo, useState } from "react";
import HeaderAuth from "../../../components/HeaderAuth";
import api from "../../../api";
import { formatDate, formatMoney } from "../../../utils/preferences";

interface Wallet { id: number; name: string }
interface Categorie { id: number; name: string }
interface Transaction {
  id: number;
  amount: number;
  type: "income" | "expense";
  created_at: string;
  wallet: Wallet;
  categorie?: Categorie;
}

export default function Transactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [categories, setCategories] = useState<Categorie[]>([]);
  const [loading, setLoading] = useState(true);
  const [editOpen, setEditOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState<Transaction | null>(null);
  const [form, setForm] = useState({
    type: "expense" as "income" | "expense",
    amount: "",
    wallet_id: "",
    categorie_id: "",
    created_at: new Date().toISOString().slice(0, 10),
  });
  const [filters, setFilters] = useState({
    type: "" as "" | "income" | "expense",
    wallet_id: "",
    categorie_id: "",
    month: String(new Date().getMonth() + 1).padStart(2, '0'),
    year: String(new Date().getFullYear()),
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchBase = async () => {
      setLoading(true);
      try {
        const [tRes, wRes, cRes] = await Promise.all([
          api.get("/transactions", { headers: { Authorization: `Bearer ${token}` } }),
          api.get("/wallets", { headers: { Authorization: `Bearer ${token}` } }),
          api.get("/categories", { headers: { Authorization: `Bearer ${token}` } }),
        ]);
        setTransactions(tRes.data.dados ?? tRes.data);
        setWallets(wRes.data.dados ?? wRes.data);
        setCategories(cRes.data.dados ?? cRes.data);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };
    fetchBase();
  }, []);

  const filtered = useMemo(() => {
    return transactions.filter(t => {
      const date = new Date(t.created_at);
      const sameMonth = String(date.getMonth() + 1).padStart(2, '0') === filters.month;
      const sameYear = String(date.getFullYear()) === filters.year;
      if (!sameMonth || !sameYear) return false;
      if (filters.type && t.type !== filters.type) return false;
      if (filters.wallet_id && String(t.wallet?.id) !== filters.wallet_id) return false;
      if (filters.categorie_id && String(t.categorie?.id) !== filters.categorie_id) return false;
      return true;
    });
  }, [transactions, filters]);

  const incomeTotal = useMemo(() => filtered.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0), [filtered]);
  const expenseTotal = useMemo(() => filtered.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0), [filtered]);

  return (
    <>
      <HeaderAuth select1={false} select2={false} select3={true} />
      <div className="max-w-6xl mx-auto px-4 mt-20">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Transações</h1>
          <div className="text-sm text-gray-500">{filtered.length} itens</div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow mb-4 grid gap-3 md:grid-cols-4 border border-gray-100">
          <select className="border rounded px-3 py-2" value={filters.type} onChange={(e) => setFilters({ ...filters, type: e.target.value as any })}>
            <option value="">Tipo: Todos</option>
            <option value="income">Receita</option>
            <option value="expense">Despesa</option>
          </select>
          <select className="border rounded px-3 py-2" value={filters.wallet_id} onChange={(e) => setFilters({ ...filters, wallet_id: e.target.value })}>
            <option value="">Carteira: Todas</option>
            {wallets.map(w => (<option key={w.id} value={w.id}>{w.name}</option>))}
          </select>
          <select className="border rounded px-3 py-2" value={filters.categorie_id} onChange={(e) => setFilters({ ...filters, categorie_id: e.target.value })}>
            <option value="">Categoria: Todas</option>
            {categories.map(c => (<option key={c.id} value={c.id}>{c.name}</option>))}
          </select>
          <div className="flex gap-2">
            <input className="border rounded px-3 py-2 w-full" value={filters.month} onChange={(e) => setFilters({ ...filters, month: e.target.value })} placeholder="MM" />
            <input className="border rounded px-3 py-2 w-full" value={filters.year} onChange={(e) => setFilters({ ...filters, year: e.target.value })} placeholder="AAAA" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow border border-gray-100">
          {loading ? (
            <p className="animate-pulse text-gray-400">Carregando...</p>
          ) : (
            <>
              <div className="flex flex-wrap items-center justify-between mb-4 gap-3">
                <div className="flex gap-2">
                  <span className="inline-flex items-center gap-2 rounded-full bg-green-50 text-green-700 px-3 py-1 text-sm border border-green-200">
                    <span className="w-2 h-2 rounded-full bg-green-500" />
                    Receitas: <strong>{formatMoney(incomeTotal)}</strong>
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-red-50 text-red-700 px-3 py-1 text-sm border border-red-200">
                    <span className="w-2 h-2 rounded-full bg-red-500" />
                    Despesas: <strong>{formatMoney(expenseTotal)}</strong>
                  </span>
                </div>
                <div className="text-xs text-gray-400">{formatDate(new Date().toISOString())}</div>
              </div>
              <ul className="divide-y">
                {filtered.map(t => (
                  <li key={t.id} className="py-3 flex items-center justify-between">
                    <div className="flex gap-4 items-center">
                      <span className={`text-sm font-semibold ${t.type === 'income' ? 'text-green-600' : 'text-red-500'}`}>
                        {t.type === 'income' ? '+ ' : '- '}{formatMoney(t.amount)}
                      </span>
                      <span className="text-gray-600 text-sm">{t.wallet?.name}</span>
                      {t.categorie?.name && <span className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 text-xs border border-gray-200">{t.categorie?.name}</span>}
                      <span className="text-gray-400 text-xs">{formatDate(t.created_at)}</span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        className="px-2 py-1 text-xs rounded bg-blue-500 hover:bg-blue-600 text-white"
                        onClick={() => {
                          setEditing(t);
                          setForm({
                            type: t.type,
                            amount: String(t.amount),
                            wallet_id: String(t.wallet?.id ?? ''),
                            categorie_id: String(t.categorie?.id ?? ''),
                            created_at: new Date(t.created_at).toISOString().slice(0, 10),
                          });
                          setEditOpen(true);
                        }}
                      >Editar</button>
                      <button
                        type="button"
                        className="px-2 py-1 text-xs rounded bg-red-500 hover:bg-red-600 text-white"
                        onClick={async () => {
                          if (!confirm('Deseja remover esta transação?')) return;
                          try {
                            await api.delete(`/transaction/${t.id}`, { headers: { Authorization: `Bearer ${token}` } });
                            setTransactions(prev => prev.filter(x => x.id !== t.id));
                          } catch (e) { console.log(e); }
                        }}
                      >Excluir</button>
                    </div>
                  </li>
                ))}
                {filtered.length === 0 && (
                  <li className="py-10 text-center text-gray-400">
                    <div className="mx-auto w-10 h-10 rounded-full bg-gray-100 border border-gray-200 mb-2" />
                    Nenhuma transação encontrada
                  </li>
                )}
              </ul>
            </>
          )}
        </div>
        {editOpen && editing && (
          <div className="fixed inset-0 z-50 flex items-center justify-center" aria-modal="true" role="dialog">
            <div className="absolute inset-0 bg-black/50" onClick={() => setEditOpen(false)} />
            <div className="relative bg-white rounded-lg shadow-lg w-11/12 max-w-md p-6" tabIndex={-1}>
              <h2 className="text-lg font-bold mb-4 text-[#706A6A]">Editar Transação</h2>
              <div className="flex flex-col gap-3">
                <div className="flex gap-3">
                  <label className="flex items-center gap-2 text-sm text-gray-700">
                    <input type="radio" name="type" value="income" checked={form.type === 'income'} onChange={() => setForm({ ...form, type: 'income' })} /> Receita
                  </label>
                  <label className="flex items-center gap-2 text-sm text-gray-700">
                    <input type="radio" name="type" value="expense" checked={form.type === 'expense'} onChange={() => setForm({ ...form, type: 'expense' })} /> Despesa
                  </label>
                </div>
                <input type="number" className="border rounded-md px-3 py-2" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} min="0" step="0.01" />
                <select className="border rounded-md px-3 py-2" value={form.wallet_id} onChange={(e) => setForm({ ...form, wallet_id: e.target.value })}>
                  <option value="">Selecione a carteira</option>
                  {wallets.map(w => (<option key={w.id} value={w.id}>{w.name}</option>))}
                </select>
                <select className="border rounded-md px-3 py-2" value={form.categorie_id} onChange={(e) => setForm({ ...form, categorie_id: e.target.value })}>
                  <option value="">Selecione a categoria</option>
                  {categories.map(c => (<option key={c.id} value={c.id}>{c.name}</option>))}
                </select>
                <input type="date" className="border rounded-md px-3 py-2" value={form.created_at} onChange={(e) => setForm({ ...form, created_at: e.target.value })} />
                <div className="flex gap-2 mt-2">
                  <button type="button" className="flex-1 text-center bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 rounded-md" onClick={() => setEditOpen(false)} disabled={saving}>Cancelar</button>
                  <button
                    type="button"
                    className="flex-1 text-center bg-green-500 hover:bg-green-600 text-white py-2 rounded-md disabled:opacity-60"
                    disabled={saving || !form.amount || !form.wallet_id || !form.categorie_id}
                    onClick={async () => {
                      if (!editing) return;
                      setSaving(true);
                      try {
                        const payload = {
                          type: form.type,
                          amount: Number(form.amount),
                          wallet_id: Number(form.wallet_id),
                          categorie_id: Number(form.categorie_id),
                          created_at: form.created_at,
                        };
                        await api.put(`/transaction/${editing.id}`, payload, { headers: { Authorization: `Bearer ${token}` } });
                        setEditOpen(false);
                        setTransactions(prev => prev.map(x => x.id === editing.id ? {
                          ...x,
                          amount: payload.amount,
                          type: payload.type,
                          created_at: payload.created_at,
                          wallet: { id: payload.wallet_id, name: wallets.find(w => w.id === payload.wallet_id)?.name || x.wallet.name },
                          categorie: payload.categorie_id ? { id: payload.categorie_id, name: categories.find(c => c.id === payload.categorie_id)?.name || x.categorie?.name || '' } : x.categorie,
                        } : x));
                      } catch (e) { console.log(e); } finally { setSaving(false); }
                    }}
                  >Salvar</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}