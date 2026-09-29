import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    // ADD these two new fields
    name: {
      type: String,
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true, // Ensures googleId is unique, but allows many nulls
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", schema);