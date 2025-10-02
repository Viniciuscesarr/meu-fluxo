import { useEffect, useMemo, useState } from "react";
import HeaderAuth from "../../../components/HeaderAuth";
import { PieChart } from "@mui/x-charts/PieChart";
import api from "../../../api";
import { formatDate, formatMoney } from "../../../utils/preferences";

interface Categorie {
  id: number;
  name: string;
}
interface Wallet {
  id: number;
  name: string;
}
interface Transaction {
  id: number;
  amount: number;
  type: "income" | "expense";
  created_at: string;
  wallet: Wallet;
  categorie?: Categorie;
}

export default function Reports() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [month, setMonth] = useState(
    String(new Date().getMonth() + 1).padStart(2, "0")
  );
  const [year, setYear] = useState(String(new Date().getFullYear()));

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchTx = async () => {
      setLoading(true);
      try {
        const res = await api.get("/transactions", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTransactions(res.data.dados ?? res.data);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };
    fetchTx();
  }, []);

  const filtered = useMemo(
    () =>
      transactions.filter((t) => {
        const d = new Date(t.created_at);
        return (
          String(d.getMonth() + 1).padStart(2, "0") === month &&
          String(d.getFullYear()) === year
        );
      }),
    [transactions, month, year]
  );

  const totals = useMemo(() => {
    let income = 0;
    let expense = 0;
    for (const t of filtered) {
      const value = Number(t.amount) || 0;
      if (t.type === "income") income += value;
      else expense += value;
    }
    return { income, expense };
  }, [filtered]);

  const pieData = useMemo(() => {
    const map = new Map<number, { id: number; value: number; label: string }>();
    for (const t of filtered) {
      if (t.type !== "expense") continue;
      const id = t.categorie?.id ?? -1;
      const label = t.categorie?.name ?? "Sem categoria";
      const current = map.get(id) ?? { id, value: 0, label };
      current.value += Number(t.amount) || 0;
      map.set(id, current);
    }
    const arr = Array.from(map.values());
    if (arr.length <= 5) return arr;
    const sorted = [...arr].sort((a, b) => b.value - a.value);
    const top = sorted.slice(0, 4);
    const rest = sorted.slice(4);
    const others = {
      id: -1,
      value: rest.reduce((s, i) => s + i.value, 0),
      label: "Outros",
    };
    return [...top, others];
  }, [filtered]);

  const downloadCSV = () => {
    const rows = [
      ["Data", "Tipo", "Valor", "Carteira", "Categoria"],
      ...filtered.map((t) => [
        new Date(t.created_at).toLocaleDateString("pt-BR"),
        t.type,
        t.amount.toString().replace(".", ","),
        t.wallet?.name ?? "",
        t.categorie?.name ?? "",
      ]),
    ];
    const csv = rows
      .map((r) =>
        r.map((field) => `"${String(field).replaceAll('"', '""')}"`).join(";")
      )
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `relatorio-${month}-${year}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadPDF = () => {
    const w = window.open("", "_blank");
    if (!w) return;

    const rows = filtered
      .map(
        (t) => `<tr>
      <td>${formatDate(t.created_at)}</td>
      <td>${t.type}</td>
      <td>${formatMoney(Number(t.amount) || 0)}</td>
      <td>${t.wallet?.name ?? ""}</td>
      <td>${t.categorie?.name ?? ""}</td>
    </tr>`
      )
      .join("");

    w.document.write(`
      <!doctype html>
      <html>
        <head>
          <title>Relatório ${month}/${year}</title>
          <style>
            body{font-family:Arial;padding:16px}
            h1{font-size:18px}
            table{width:100%;border-collapse:collapse;margin-top:12px}
            th,td{border:1px solid #ccc;padding:6px;text-align:left;font-size:12px}
          </style>
        </head>
        <body>
          <h1>Relatório ${month}/${year}</h1>
          <div>Receitas: <strong>${formatMoney(totals.income)}</strong></div>
          <div>Despesas: <strong>${formatMoney(totals.expense)}</strong></div>
          <table>
            <thead>
              <tr><th>Data</th><th>Tipo</th><th>Valor</th><th>Carteira</th><th>Categoria</th></tr>
            </thead>
            <tbody>${rows}</tbody>
          </table>
          <script>window.onload=()=>{window.print();}</script>
        </body>
      </html>
    `);
    w.document.close();
  };

  const downloadPDFAll = () => {
    const w = window.open("", "_blank");
    if (!w) return;

    const allSorted = [...transactions].sort(
      (a, b) =>
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
    );

    const rows = allSorted
      .map(
        (t) => `<tr>
      <td>${formatDate(t.created_at)}</td>
      <td>${t.type}</td>
      <td>${formatMoney(Number(t.amount) || 0)}</td>
      <td>${t.wallet?.name ?? ""}</td>
      <td>${t.categorie?.name ?? ""}</td>
    </tr>`
      )
      .join("");

    const totalIncome = allSorted
      .filter((t) => t.type === "income")
      .reduce((s, t) => s + Number(t.amount) || 0, 0);
    const totalExpense = allSorted
      .filter((t) => t.type === "expense")
      .reduce((s, t) => s + Number(t.amount) || 0, 0);

    w.document.write(`
      <!doctype html>
      <html>
        <head>
          <title>Relatório Completo</title>
          <style>
            body{font-family:Arial;padding:16px}
            h1{font-size:18px}
            table{width:100%;border-collapse:collapse;margin-top:12px}
            th,td{border:1px solid #ccc;padding:6px;text-align:left;font-size:12px}
          </style>
        </head>
        <body>
          <h1>Relatório Completo</h1>
          <div>Receitas: <strong>${formatMoney(totalIncome)}</strong></div>
          <div>Despesas: <strong>${formatMoney(totalExpense)}</strong></div>
          <table>
            <thead>
              <tr><th>Data</th><th>Tipo</th><th>Valor</th><th>Carteira</th><th>Categoria</th></tr>
            </thead>
            <tbody>${rows}</tbody>
          </table>
          <script>window.onload=()=>{window.print();}</script>
        </body>
      </html>
    `);
    w.document.close();
  };

  return (
    <>
      <HeaderAuth select1={false} select2={true} select3={false} />
      <div className="max-w-6xl mx-auto px-4 mt-20">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-2 sm:gap-0">
          <h1 className="text-2xl font-bold">Relatórios</h1>
          <div className="text-sm text-gray-500">{filtered.length} lançamentos</div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow mb-4 flex flex-col sm:flex-row gap-3 sm:items-center border border-gray-100">
          <input
            className="border rounded px-3 py-2 w-full sm:w-20"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            placeholder="MM"
          />
          <input
            className="border rounded px-3 py-2 w-full sm:w-28"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            placeholder="AAAA"
          />
          <div className="flex flex-wrap gap-2 sm:ml-auto">
            <button
              type="button"
              className="px-3 py-2 rounded bg-gray-200 hover:bg-gray-300"
              onClick={downloadCSV}
            >
              Exportar CSV
            </button>
            <button
              type="button"
              className="px-3 py-2 rounded bg-gray-200 hover:bg-gray-300"
              onClick={downloadPDF}
            >
              Exportar PDF
            </button>
            <button
              type="button"
              className="px-3 py-2 rounded bg-gray-200 hover:bg-gray-300"
              onClick={downloadPDFAll}
            >
              PDF Completo
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Totais e lista */}
          <div className="bg-white p-4 rounded-lg shadow border border-gray-100">
            <h2 className="font-semibold text-gray-700 mb-3">Totais do Mês</h2>
            {loading ? (
              <p className="animate-pulse text-gray-400">Carregando...</p>
            ) : (
              <>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="inline-flex items-center gap-2 rounded-full bg-green-50 text-green-700 px-3 py-1 text-sm border border-green-200">
                    <span className="w-2 h-2 rounded-full bg-green-500" />
                    Receitas: <strong>{formatMoney(totals.income)}</strong>
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-red-50 text-red-700 px-3 py-1 text-sm border border-red-200">
                    <span className="w-2 h-2 rounded-full bg-red-500" />
                    Despesas: <strong>{formatMoney(totals.expense)}</strong>
                  </span>
                </div>
                {/* Lista de transações */}
                <div className="overflow-x-auto max-h-72">
                  <table className="min-w-full border border-gray-200 text-sm">
                    <thead className="bg-gray-50 sticky top-0">
                      <tr>
                        <th className="px-2 py-1 border-b">Data</th>
                        <th className="px-2 py-1 border-b">Tipo</th>
                        <th className="px-2 py-1 border-b">Valor</th>
                        <th className="px-2 py-1 border-b">Carteira</th>
                        <th className="px-2 py-1 border-b">Categoria</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map((t) => (
                        <tr key={t.id}>
                          <td className="px-2 py-1 border-b">{formatDate(t.created_at)}</td>
                          <td className="px-2 py-1 border-b">{t.type}</td>
                          <td className="px-2 py-1 border-b">{formatMoney(Number(t.amount) || 0)}</td>
                          <td className="px-2 py-1 border-b">{t.wallet?.name ?? ""}</td>
                          <td className="px-2 py-1 border-b">{t.categorie?.name ?? ""}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>

          {/* Gráfico */}
          <div className="bg-white p-4 rounded-lg shadow flex flex-col items-center border border-gray-100">
            <h2 className="font-semibold text-gray-700 mb-3">Gastos por Categoria</h2>
            {pieData.length > 0 ? (
              <div className="flex flex-col items-center w-full">
                <div className="w-full max-w-[300px] mx-auto">
                  <PieChart
                    series={[
                      {
                        data: pieData,
                        innerRadius: 60,
                        paddingAngle: 1.5,
                        cornerRadius: 3,
                      },
                    ]}
                    width={280}
                    height={280}
                  />
                </div>
                <div className="mt-2 flex flex-wrap justify-center gap-x-3 gap-y-1 text-xs text-gray-600 max-w-full">
                  {pieData.map((p) => (
                    <span key={p.id} className="whitespace-nowrap">
                      {p.label.length > 16 ? p.label.slice(0, 16) + "…" : p.label}
                    </span>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-gray-400 py-8 text-center">
                <div className="mx-auto w-10 h-10 rounded-full bg-gray-100 border border-gray-200 mb-2" />
                Sem dados para exibir
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
