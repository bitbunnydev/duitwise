export async function getExpenses(req, res) {
  res.status(200).json({ message: "You just fetched all expenses" });
}

export async function createExpense(req, res) {
  res.status(201).json({ message: "You just created a new expense" });
}

export async function updateExpense(req, res) {
  const { id } = req.params;
  res.status(200).json({ message: "You just updated the expense", id });
}

export async function deleteExpense(req, res) {
  const { id } = req.params;
  res.status(200).json({ message: "You just deleted the expense", id });
}
