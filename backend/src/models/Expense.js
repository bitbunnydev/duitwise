import mongoose from "mongoose";

// Define the Expense schema
const expenseSchema = new mongoose.Schema(
  {
    expenseDesc: { type: String, required: true },
    expenseAmount: { type: Number, required: true },
    expenseCategory: { type: String, required: true },
    expenseDate: { type: Date, required: true },
  },
  { timestamps: true },
);
// Create the Expense model
const Expense = mongoose.model("Expense", expenseSchema);

export default Expense;
