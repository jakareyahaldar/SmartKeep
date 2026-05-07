const mongoose = require("mongoose");

const linkSchema = new mongoose.Schema(
  {
    title: { type: String },
    url: { type: String, required: true },
    note: { type: String }
  },
  {
    timestamps: true,
  }
);

const Link = mongoose.model("Link", linkSchema);

module.exports = Link;