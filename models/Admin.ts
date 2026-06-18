import { Schema, model, models } from "mongoose";

const adminSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: { type: String, required: true },

    role: {
      type: String,
      enum: ["ADMIN", "MANAGER"],
      default: "ADMIN",
    },
  },
  { timestamps: true }
);

export default models.Admin || model("Admin", adminSchema);