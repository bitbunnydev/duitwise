import express from "express";
import expenseRouter from "./src/routes/expenseRoutes.js";

const app = express();

app.use("/api/expenses", expenseRouter);

app.listen(3000, () => {
  console.log("Server is running on PORT: 3000");
});
