const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: { type: String },
    note: { type: String, required: true },
    due: { type: String },
    due_time: { type: String },
    status: { type: String, default: "pending" },
    seventyNotify: { type: Boolean, default: false },
    endNotify: { type: Boolean, default: false }
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;