import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const HomePage = () => {
  //1. State variables
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    expenseDesc: "",
    expenseAmount: "",
    expenseCategory: "Food",
    expenseDate: "",
  });
  //2. Configurations
  const API_URL = "http://localhost:5000/api/expenses";
  //3. Functions
  //Fetch all expenses
  const getAllExpenses = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);
      setExpenses(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch expenses data");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getAllExpenses();
  }, []);
  //Handle typing in inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  //Submit or Create expense
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(API_URL, formData);
      if (response.status === 201) {
        toast.success("Expense added!");
        getAllExpenses();
        setFormData({
          expenseDesc: "",
          expenseAmount: "",
          expenseCategory: "Food",
          expenseDate: "",
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed tp add expense");
    }
  };
  //Delete expense
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure want to delete this expense?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      toast.success("Expense deleted!");
      getAllExpenses();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete expense");
    }
  };
  //4. UI
};

export default HomePage;
