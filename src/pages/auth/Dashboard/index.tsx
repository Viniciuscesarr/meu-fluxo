import { useState, useEffect, useCallback } from "react";
import HeaderAuth from "../../../components/HeaderAuth";
import {
  EyeClosed,
  Eye,
  ScrollText,
  BanknoteArrowUpIcon,
  BanknoteArrowDownIcon,
  CirclePlus,
  CircleMinus,
  User,
} from "lucide-react";
import { Link } from "react-router-dom";
import { PieChart } from "@mui/x-charts/PieChart";
import api from "../../../api";
import { formatMoney } from "../../../utils/preferences";

interface Saldo {
  saldo_geral: number;
}

interface Transaction {
  id: number;
  user_id: number;
  wallet_id: number;
  wallet: Wallet;
  categorie_id: number;
  categorie?: Categorie;
  amount: number;
  created_at: string;
  updated_at: string;
  type: "income" | "expense";
}

interface Categorie {
  id: number;
  name: string;
}

interface Wallet {
  id: number;
  user_id: number;
  name: string;
  created_at: string;
  updated_at: string;
} 

interface User {
  name: string,
  email: string,
}

interface PieItem {
  id: number;
  value: number;
  label: string;
}

export default function AuthHome() {
  const [saldo, setSaldo] = useState<Saldo>();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(true);
  const [showBalance, setShowBalance] = useState(true);
  const [pieData, setPieData] = useState<PieItem[]>([]);
  const [monthlyIncome, setMonthlyIncome] = useState<number>(0);
  const [monthlyExpense, setMonthlyExpense] = useState<number>(0);
  const [quickAccessOpen, setQuickAccessOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [categories, setCategories] = useState<Categorie[]>([]);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    type: "expense" as "income" | "expense",
    amount: "",
    wallet_id: "",
    categorie_id: "",
    created_at: new Date().toISOString().slice(0, 10),
  });

  const date = new Date();
  const hours = date.getHours();
  const msg =
    hours >= 18
      ? "Boa noite!"
      : hours >= 12
      ? "Boa tarde!"
      : hours >= 6
      ? "Bom dia!"
      : "Boa madrugada!";

  const generatePieData = (transactions: Transaction[]): PieItem[] => {
    const map = new Map<number, PieItem>();

    transactions.forEach((t) => {
      if (t.type !== "expense") return;

      const categoryId = t.categorie_id;
      const categoryLabel = t.categorie?.name ?? `Cat ${categoryId}`;

      if (map.has(categoryId)) {
        map.get(categoryId)!.value += t.amount;
      } else {
        map.set(categoryId, {
          id: categoryId,
          value: t.amount,
          label: categoryLabel,
        });
      }
    });

    return Array.from(map.values());
  };
  const aggregatePieData = (data: PieItem[], maxSlices: number = 5): PieItem[] => {
    if (data.length <= maxSlices) return data;
    const sorted = [...data].sort((a, b) => b.value - a.value);
    const top = sorted.slice(0, maxSlices - 1);
    const rest = sorted.slice(maxSlices - 1);
    const othersValue = rest.reduce((s, i) => s + i.value, 0);
    return [...top, { id: -1, value: othersValue, label: "Outros" }];
  };
  const token = localStorage.getItem("token");
  const fetchData = useCallback(async () => {
    setLoading(true);
      try {
        const saldoRes = await api.get("/saldo-geral", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSaldo(saldoRes.data);

        const transactionsRes = await api.get("/transactions", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const UserRes = await api.get("/user", {
          headers: {
            Authorization: `Bearer ${token}`
          },
        })
        setUser(UserRes.data)
       // console.log(UserRes.data)

        const dados = transactionsRes.data.dados;
        setTransactions(dados);

        const pie = generatePieData(dados);
        setPieData(aggregatePieData(pie));

        // Calcular totais do mês atual
        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();

        let incomeSum = 0;
        let expenseSum = 0;
        for (const t of dados) {
          const created = new Date(t.created_at);
          if (created.getMonth() === currentMonth && created.getFullYear() === currentYear) {
            if (t.type === "income") {
              incomeSum += t.amount;
            } else if (t.type === "expense") {
              expenseSum += t.amount;
            }
          }
        }
        setMonthlyIncome(incomeSum);
        setMonthlyExpense(expenseSum);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
  }, [token]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const openCreateTransaction = async () => {
    setCreateOpen(true);
    try {
      const [wRes, cRes] = await Promise.all([
        api.get("/wallets", { headers: { Authorization: `Bearer ${token}` } }),
        api.get("/categories", { headers: { Authorization: `Bearer ${token}` } }),
      ]);
      setWallets(wRes.data.dados ?? wRes.data);
      setCategories(cRes.data.dados ?? cRes.data);
    } catch (e) {
      console.log(e);
    }
  };

  const handleCreate = async () => {
    if (!form.amount || !form.wallet_id || !form.categorie_id) return;
    setSaving(true);
    try {
      const payload = {
        type: form.type,
        amount: Number(form.amount),
        wallet_id: Number(form.wallet_id),
        categorie_id: Number(form.categorie_id),
        created_at: form.created_at,
      };
      await api.post("/transaction", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCreateOpen(false);
      setForm({
        type: "expense",
        amount: "",
        wallet_id: "",
        categorie_id: "",
        created_at: new Date().toISOString().slice(0, 10),
      });
      fetchData();
    } catch (e) {
      console.log(e);
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <HeaderAuth select1={true} select2={false} select3={false} />

      <div className="max-w-6xl mx-auto px-4 mt-20">
        {/* Saudação */}
        <div className="mb-8 text-center md:text-left">
          <p className="text-[#706A6A] font-semibold">{msg}</p>
          <p className="text-2xl font-bold">{user?.name}</p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Saldo Geral */}
          <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center">
            <p className="text-[#706A6A] font-semibold text-center">
              Saldo Geral
            </p>
            <div className="flex items-center gap-2 mt-2">
              <p className="font-bold text-[20px]">
                {showBalance ? (saldo ? formatMoney(saldo.saldo_geral) : "-") : "••••••••"}
              </p>
              <div
                onClick={() => setShowBalance(!showBalance)}
                className="hover:cursor-pointer"
              >
                {showBalance ? (
                  <Eye size={24} className="text-[#706A6A]" />
                ) : (
                  <EyeClosed size={24} className="text-[#706A6A]" />
                )}
              </div>
            </div>
            <div className="flex items-center gap-2 text-[#706A6A] mt-4 justify-center">
              <ScrollText size={20} />
              <Link to="/auth/reports" className="hover:underline font-medium">
                Relatórios
              </Link>
            </div>
          </div>

          {/* Receita Mensal */}
          <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center justify-center">
            <p className="text-[#706A6A] font-semibold text-center">
              Receita Mensal
            </p>
            <p className="mt-4 font-bold text-lg text-gray-700">
              {loading ? (
                <span className="animate-pulse text-gray-400">Carregando...</span>
              ) : (
                <>{formatMoney(monthlyIncome)}</>
              )}
            </p>
          </div>

          {/* Despesas Mensais */}
          <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center justify-center">
            <p className="text-[#706A6A] font-semibold text-center">
              Despesas Mensais
            </p>
            <p className="mt-4 font-bold text-lg text-gray-700">
              {loading ? (
                <span className="animate-pulse text-gray-400">Carregando...</span>
              ) : (
                <>{formatMoney(monthlyExpense)}</>
              )}
            </p>
          </div>

          {/* Acesso Rápido */}
          <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center justify-center">
            <p className="text-[#706A6A] font-semibold text-center">
              Acesso Rápido
            </p>
            <p className="mt-4 font-bold text-lg text-gray-700 flex gap-4">
              <button
                type="button"
                onClick={() => openCreateTransaction()}
                className="hover:opacity-80"
                title="Criar transação"
              >
                <CirclePlus size={38} className="text-green-400" />
              </button>
              <button
                type="button"
                onClick={() => setQuickAccessOpen(true)}
                className="hover:opacity-80"
                title="Abrir opções rápidas"
              >
                <CircleMinus size={38} className="text-red-400" />
              </button>
            </p>
          </div>

        {quickAccessOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center"
            aria-modal="true"
            role="dialog"
          >
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => setQuickAccessOpen(false)}
            />
            <div
              className="relative bg-white rounded-lg shadow-lg w-11/12 max-w-md p-6"
              tabIndex={-1}
              onKeyDown={(e) => {
                if (e.key === 'Escape') setQuickAccessOpen(false);
              }}
            >
              <h2 className="text-lg font-bold mb-4 text-[#706A6A]">Acesso Rápido</h2>
              <div className="flex flex-col gap-3">
                <Link
                  to="/auth/transactions"
                  className="w-full text-center bg-green-500 hover:bg-green-600 text-white py-2 rounded-md"
                  onClick={() => setQuickAccessOpen(false)}
                >
                  Ir para Transações
                </Link>
                <Link
                  to="/auth/reports"
                  className="w-full text-center bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md"
                  onClick={() => setQuickAccessOpen(false)}
                >
                  Ir para Relatórios
                </Link>
                <button
                  type="button"
                  className="w-full text-center bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 rounded-md"
                  onClick={() => setQuickAccessOpen(false)}
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        )}

        {createOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center" aria-modal="true" role="dialog">
            <div className="absolute inset-0 bg-black/50" onClick={() => setCreateOpen(false)} />
            <div className="relative bg-white rounded-lg shadow-lg w-11/12 max-w-md p-6" tabIndex={-1}>
              <h2 className="text-lg font-bold mb-4 text-[#706A6A]">Nova Transação</h2>
              <div className="flex flex-col gap-3">
                <div className="flex gap-3">
                  <label className="flex items-center gap-2 text-sm text-gray-700">
                    <input
                      type="radio"
                      name="type"
                      value="income"
                      checked={form.type === 'income'}
                      onChange={() => setForm({ ...form, type: 'income' })}
                    />
                    Receita
                  </label>
                  <label className="flex items-center gap-2 text-sm text-gray-700">
                    <input
                      type="radio"
                      name="type"
                      value="expense"
                      checked={form.type === 'expense'}
                      onChange={() => setForm({ ...form, type: 'expense' })}
                    />
                    Despesa
                  </label>
                </div>
                <input
                  type="number"
                  placeholder="Valor"
                  className="border rounded-md px-3 py-2"
                  value={form.amount}
                  onChange={(e) => setForm({ ...form, amount: e.target.value })}
                  min="0"
                  step="0.01"
                />
                <select
                  className="border rounded-md px-3 py-2"
                  value={form.wallet_id}
                  onChange={(e) => setForm({ ...form, wallet_id: e.target.value })}
                >
                  <option value="">Selecione a carteira</option>
                  {wallets.map(w => (
                    <option key={w.id} value={w.id}>{w.name}</option>
                  ))}
                </select>
                <select
                  className="border rounded-md px-3 py-2"
                  value={form.categorie_id}
                  onChange={(e) => setForm({ ...form, categorie_id: e.target.value })}
                >
                  <option value="">Selecione a categoria</option>
                  {categories.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
                <input
                  type="date"
                  className="border rounded-md px-3 py-2"
                  value={form.created_at}
                  onChange={(e) => setForm({ ...form, created_at: e.target.value })}
                />
                <div className="flex gap-2 mt-2">
                  <button
                    type="button"
                    className="flex-1 text-center bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 rounded-md"
                    onClick={() => setCreateOpen(false)}
                    disabled={saving}
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    className="flex-1 text-center bg-green-500 hover:bg-green-600 text-white py-2 rounded-md disabled:opacity-60"
                    onClick={handleCreate}
                    disabled={saving || !form.amount || !form.wallet_id || !form.categorie_id}
                  >
                    {saving ? 'Salvando...' : 'Salvar'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        </div>

        <div className="bg-white shadow-md p-5 max-w-[100%] md:max-w-[50%] mt-3 rounded-lg">
          <h3 className="text-[#706A6A] text-center font-bold">
            Últimos Gastos
          </h3>
          <hr className="text-[#706A6A]" />
            <div className="flex gap-5 justify-between flex-col md:flex-row">
            <div className="flex flex-col">
              {loading && (
                <p className="animate-spin w-8 h-8 border-4 border-t-green-500 rounded-full m-auto"></p>
              )}
              {transactions.slice(0, 5).map((t) => (
                <div className="flex items-center justify-between py-1.5" key={t.id}>
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="shrink-0">
                      {t.type === "income" ? (
                        <BanknoteArrowUpIcon size={20} className="text-green-500" />
                      ) : (
                        <BanknoteArrowDownIcon size={20} className="text-red-400" />
                      )}
                    </div>
                    <span className="text-sm text-gray-700 truncate max-w-[140px] md:max-w-[200px]">
                      {t.wallet.name}
                    </span>
                  </div>
                  <span
                    className={`text-sm font-semibold whitespace-nowrap ${
                      t.type === "income" ? "text-green-600" : "text-red-500"
                    }`}
                  >
                    {t.type === "income" ? "+" : "-"} {formatMoney(t.amount)}
                  </span>
                </div>
              ))}
            </div>

            <hr className="text-[#706A6A] md:hidden" />
            <div className="w-[.3px] bg-[#706A6A] mt-3 hidden"></div>

            <div>
              {pieData.length > 0 ? (
                <div className="flex flex-col items-center">
                  <PieChart
                    series={[{
                      data: pieData,
                      innerRadius: 60,
                      paddingAngle: 1.5,
                      cornerRadius: 3,
                    }]}
                    width={240}
                    height={240}
                  />
                  <div className="mt-2 flex flex-wrap justify-center gap-x-3 gap-y-1 text-xs text-gray-600 max-w-[280px]">
                    {pieData.map((p) => (
                      <span key={p.id} className="whitespace-nowrap">
                        {p.label.length > 14 ? p.label.slice(0, 14) + '…' : p.label}
                      </span>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="text-center text-gray-400">
                  Sem dados para exibir
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
