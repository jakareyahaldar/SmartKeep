// index.js
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// Load env variables
dotenv.config();

// Import DB connection
const connectDB = require("./db/con.db.js");
// Initialize app
const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
})); // Enable CORS
app.use(express.json()); // JSON parser
app.use(cookieParser()); // Coockie parser

// Router use 
app.use("/admin",require("./routes/admin.router.js"))
app.use("/contacts",require("./routes/contact.router.js"))
app.use("/links",require("./routes/link.router.js"))
app.use("/tasks",require("./routes/tasks.router.js"))
app.use("/notes",require("./routes/notes.router.js"))
app.use("/passwords",require("./routes/passwords.router.js"))
app.use("/all",require("./routes/all.route.js"))
// Test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Port
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});