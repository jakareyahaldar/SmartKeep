const mongoose = require("mongoose");
const { getHash } = require("../../lib/jwt.js")

const adminSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

/**
 * 🔒 Ensure only ONE admin document exists
 */
adminSchema.statics.getAdmin = async function () {
  let admin = await this.findOne();

  // যদি admin না থাকে → auto create
  if (!admin) {
    admin = await this.create({
      email: "admin@admin.com",
      password: getHash({password: "admin123"}), // পরে hash করো
    });
  }

  return admin;
};

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;