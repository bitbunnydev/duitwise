import Expense from "../models/Expense.js";

// Get all expenses
export async function getExpenses(req, res) {
  try {
    const expenses = await Expense.find().sort({ expenseDate: -1 }); //
    res.status(200).json(expenses);
  } catch (error) {
    console.error("Error fetching expenses:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
}

// Create a new expense
export async function createExpense(req, res) {
  try {
    const { expenseDesc, expenseAmount, expenseCategory, expenseDate } =
      req.body;
    const newExpense = new Expense({
      expenseDesc,
      expenseAmount,
      expenseCategory,
      expenseDate,
    });
    await newExpense.save();
    res
      .status(201)
      .json({ message: "Success create an expenses", data: newExpense });
  } catch (error) {
    console.error("Error creating expense:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
}

// Update an existing expense
export async function updateExpense(req, res) {
  try {
    const { id } = req.params;
    const { expenseDesc, expenseAmount, expenseCategory, expenseDate } =
      req.body;
    const updateExpense = await Expense.findByIdAndUpdate(
      id,
      {
        expenseDesc,
        expenseAmount,
        expenseCategory,
        expenseDate,
      },
      { new: true, runValidators: true }
    );
    if (!updateExpense) {
      return res.status(404).json({ message: "Expense not found" });
    }
    res
      .status(200)
      .json({ message: "Update successfully", data: updateExpense });
  } catch (error) {
    console.error("Error updating expense:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
}

export async function deleteExpense(req, res) {
  try {
    const { id } = req.params;
    const deletedExpense = await Expense.findByIdAndDelete(id);

    if (!deletedExpense) {
      return res.status(404).json({ message: "Expense not found" });
    }
    res
      .status(200)
      .json({ message: "Delete successful", data: deletedExpense });
  } catch (error) {
    console.error("Error deleting expense", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
}
