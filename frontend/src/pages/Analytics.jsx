import { useEffect, useState } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { TrendingUp, Wallet } from "lucide-react";
import { formatCurrency } from "../utils/formatters";

// IMPORTS FOR NAVBARS
import DesktopNavbar from "../components/NavBar";
import MobileNavbar from "../components/MobileNavbar";

const COLORS = ["#6366f1", "#22c55e", "#f59e0b", "#ef4444"];

const Analytics = () => {
  const [expenses, setExpenses] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const API_URL = "http://localhost:5000/api/expenses";

  useEffect(() => {
    axios.get(API_URL).then((res) => setExpenses(res.data));
  }, []);

  const categoryData = Object.values(
    expenses.reduce((acc, curr) => {
      const cat = curr.expenseCategory;
      if (!acc[cat]) {
        acc[cat] = { name: cat, value: 0 };
      }
      acc[cat].value += Number(curr.expenseAmount || 0);
      return acc;
    }, {}),
  );

  const total = categoryData.reduce((a, b) => a + b.value, 0);

  return (
    <div className="min-h-screen bg-gray-50 pb-32 md:pb-0">
      {" "}
      {/* Desktop Navbar */}
      <DesktopNavbar total={total} onAddClick={() => setIsFormOpen(true)} />
      <div className="p-6 max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <TrendingUp className="text-primary" />
          <h1 className="text-2xl font-black text-gray-800">Analytics</h1>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm flex items-center gap-4 mb-10">
          <div className="p-3 bg-primary-soft rounded-xl text-primary">
            <Wallet size={24} />
          </div>
          <div>
            <p className="text-xs uppercase font-black text-gray-400 tracking-widest">
              Total Spending
            </p>
            <p className="text-2xl font-black text-primary">
              {formatCurrency(total)}
            </p>
          </div>
        </div>

        {categoryData.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-3xl p-6 shadow-xs border border-gray-100">
              <p className="font-black text-gray-700 mb-4">
                Spending by Category
              </p>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={5}
                    >
                      {categoryData.map((_, i) => (
                        <Cell
                          key={i}
                          fill={COLORS[i % COLORS.length]}
                          className="outline-none"
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(v) => formatCurrency(v)}
                      contentStyle={{
                        borderRadius: "16px",
                        border: "none",
                        boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-xs border border-gray-100">
              <p className="font-black text-gray-700 mb-6">Breakdown</p>
              <div className="space-y-4">
                {categoryData.map((c, i) => (
                  <div
                    key={c.name}
                    className="flex justify-between items-center p-3 rounded-2xl hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: COLORS[i % COLORS.length] }}
                      />
                      <span className="font-bold text-gray-600">{c.name}</span>
                    </div>
                    <span className="font-black text-gray-800">
                      {formatCurrency(c.value)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-20 text-center shadow-sm">
            <p className="text-gray-400 text-lg font-bold">
              No data to analyze yet 📉
            </p>
          </div>
        )}
      </div>
      {/* Added Mobile Navbar at the bottom */}
      <MobileNavbar total={total} onAddClick={() => setIsFormOpen(true)} />
      {/* Modal logic */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white p-8 rounded-3xl max-w-md w-full relative animate-pop">
            <button
              onClick={() => setIsFormOpen(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
            <h2 className="text-2xl font-black mb-2">New Spend?</h2>
            <p className="text-gray-500 mb-6">
              Let's head back to the dashboard to log a new expense.
            </p>
            <button
              onClick={() => (window.location.href = "/")}
              className="w-full bg-primary text-white py-4 rounded-2xl font-black shadow-lg shadow-primary/20 active:scale-95 transition-all"
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Analytics;
