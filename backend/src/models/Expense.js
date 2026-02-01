import mongoose from "mongoose";

// Define the Expense schema
const expenseSchema = new mongoose.Schema(
  {
    expenseDesc: { type: String, required: true },
    expenseAmount: {
      type: Number,
      required: true,
      min: [0.01, "Expense must be at least 0.01"],
    },
    expenseCategory: { type: String, required: true },
    expenseDate: { type: Date, required: true },
  },
  { timestamps: true },
);
// Create the Expense model
const Expense = mongoose.model("Expense", expenseSchema);

export default Expense;
