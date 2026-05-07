const mongoose = require("mongoose");

const passwordSchema = new mongoose.Schema(
  {
    site: {
      type: String,
      required: true
    },
    username: String,
    email: String,
    phone: String,
    password: {
      type: String,
      required: true
    },
    note: String
  },
  {
    timestamps: true,
  }
);

const Password = mongoose.model("Password", passwordSchema);

module.exports = Password;