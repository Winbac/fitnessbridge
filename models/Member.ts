import { Schema, model, models } from "mongoose";

const memberSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    phone: {
      type: String,
      required: true,
    },

    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: true,
    },

    age: {
      type: Number,
      required: true,
    },

    address: {
      type: String,
    },

    plan: {
      type: Schema.Types.ObjectId,
      ref: "Plan",
      required: true,
    },

    joinDate: {
      type: Date,
      default: Date.now,
    },

    membershipEndDate: {
      type: Date,
      required: true,
    },

    paymentStatus: {
      type: String,
      enum: ["PAID", "PENDING"],
      default: "PENDING",
    },

    status: {
      type: String,
      enum: ["ACTIVE", "INACTIVE"],
      default: "ACTIVE",
    },
  },
  {
    timestamps: true,
  }
);

export default models.Member || model("Member", memberSchema);