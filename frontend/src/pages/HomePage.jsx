import { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { X, Trash2 } from "lucide-react";
import MobileNavbar from "../components/MobileNavbar";
// Importing your utility functions
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
      const response = await axios.get(API_URL);
      setExpenses(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Error fetching expenses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllExpenses();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.expenseDesc ||
      !formData.expenseAmount ||
      !formData.expenseDate
    ) {
      toast.error("Please fill in all fields!");
      return;
    }

    try {
      const response = await axios.post(API_URL, formData);
      if (response.status === 201) {
        toast.success("Expense added! 🎉");
        getAllExpenses();
        // Reset form
        setFormData({
          expenseDesc: "",
          expenseAmount: "",
          expenseCategory: "Food",
          expenseDate: new Date().toISOString().split("T")[0],
        });
        setIsFormOpen(false);
      }
    } catch (error) {
      toast.error("Failed to add expense");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      toast.success("Deleted successfully 🗑️");
      setExpenses(expenses.filter((item) => item._id !== id));
    } catch (error) {
      toast.error("Failed to delete");
    }
  };

  //Avoid NaN errors
  const totalAmount = expenses.reduce(
    (acc, curr) => acc + Number(curr.expenseAmount || 0),
    0,
  );

  return (
    <div>
      <Toaster />
    </div>
  );
};

export default HomePage;
