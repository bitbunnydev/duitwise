import express from "express";
import expenseRouter from "./src/routes/expenseRoutes.js";
import { connectDB } from "./src/config/db.js";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const app = express(); // Initialize Express app
const PORT = process.env.PORT || 3000;

connectDB(); // Connect to the database from db.js

app.use(express.json()); // Middleware to parse JSON bodies
app.use("/api/expenses", expenseRouter); // Use the expense routes

app.listen(PORT, () => {
  console.log("Server is running on PORT:", PORT);
});
