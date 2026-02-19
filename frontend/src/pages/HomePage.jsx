import { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Wallet, Trash2, Loader2, TrendingDown } from "lucide-react";

// Components
import MobileNavbar from "../components/MobileNavbar";
import DesktopNavbar from "../components/NavBar";
import ExpenseForm from "../components/ExpenseForm";
import {
  formatCurrency,
  formatDate,
  getCategoryIcon,
} from "../utils/formatters";

const HomePage = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const [formData, setFormData] = useState({
    expenseDesc: "",
    expenseAmount: "",
    expenseCategory: "Food",
    expenseDate: new Date().toISOString().split("T")[0],
  });

  const API_URL = "http://localhost:5000/api/expenses";

  const getAllExpenses = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);
      setExpenses(res.data);
    } catch {
      toast.error("Failed to fetch expenses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllExpenses();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.expenseDesc || !formData.expenseAmount) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const res = await axios.post(API_URL, formData);
      if (res.status === 201) {
        toast.success("Expense added 🎉");
        getAllExpenses();
        setIsFormOpen(false);
        setFormData({
          expenseDesc: "",
          expenseAmount: "",
          expenseCategory: "Food",
          expenseDate: new Date().toISOString().split("T")[0],
        });
      }
    } catch {
      toast.error("Failed to add expense");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this expense?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      setExpenses((prev) => prev.filter((e) => e._id !== id));
      toast.success("Deleted 🗑️");
    } catch {
      toast.error("Delete failed");
    }
  };

  const totalAmount = expenses.reduce(
    (acc, curr) => acc + Number(curr.expenseAmount || 0),
    0,
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-35 md:pb-0">
      <Toaster />

      {/* Link the Navbar button to our State */}
      <DesktopNavbar
        total={totalAmount}
        onAddClick={() => setIsFormOpen(true)}
      />

      {/* Mobile Header */}
      <div className="md:hidden p-6 flex items-center gap-3">
        <Wallet className="text-primary" />
        <h1 className="text-2xl font-black text-gray-800">DuitWise</h1>
      </div>

      {/* Main Content */}
      <div className="px-6 max-w-3xl mx-auto space-y-4 py-6">
        {loading ? (
          <div className="flex justify-center mt-20">
            <Loader2 className="animate-spin text-primary" size={32} />
          </div>
        ) : expenses.length === 0 ? (
          <div className="text-center mt-24 text-gray-400">
            <TrendingDown size={42} className="mx-auto mb-3" />
            <p className="font-bold">No expenses yet</p>
          </div>
        ) : (
          expenses.map((item) => (
            <div
              key={item._id}
              className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center"
            >
              <div className="flex gap-3 items-center">
                {getCategoryIcon(item.expenseCategory)}
                <div>
                  <p className="font-bold text-gray-800">{item.expenseDesc}</p>
                  <p className="text-xs text-gray-400">
                    {formatDate(item.expenseDate)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-black text-primary">
                  {formatCurrency(item.expenseAmount)}
                </span>
                <button onClick={() => handleDelete(item._id)}>
                  <Trash2
                    size={18}
                    className="text-red-300 hover:text-red-500 transition"
                  />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* The Modal Logic */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-end md:items-center justify-center animate-in fade-in duration-200">
          <div className="bg-white w-full md:max-w-md p-6 rounded-t-3xl md:rounded-3xl shadow-2xl overflow-hidden">
            <ExpenseForm
              formData={formData}
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
              setIsFormOpen={setIsFormOpen}
              isMobile={true}
            />
          </div>
          {/* Click outside to close */}
          <div
            className="absolute inset-0 -z-10"
            onClick={() => setIsFormOpen(false)}
          />
        </div>
      )}

      <MobileNavbar
        total={totalAmount}
        onAddClick={() => setIsFormOpen(true)}
      />
    </div>
  );
};

export default HomePage;
