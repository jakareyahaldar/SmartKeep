const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: { type: String },
    note: { type: String, required: true },
    due: { type: String },
    status: { type: String, default: "pending" }
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;