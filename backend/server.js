import "dotenv/config";
import express from "express";
import connectDB from "./config/db.js";
import subjectRoutes from "./routes/subjectRoutes.js";
import teacherRoutes from "./routes/teacherRoutes.js";
import timetableRoutes from "./routes/timetableRoutes.js";

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("API is running");
});

// API Routes
app.use("/api/subjects",   subjectRoutes);
app.use("/api/teachers",   teacherRoutes);
app.use("/api/timetables", timetableRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
