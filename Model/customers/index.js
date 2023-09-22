const mongoose = require("mongoose");

const customersSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    token: {
      type: String,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("customers", customersSchema);
