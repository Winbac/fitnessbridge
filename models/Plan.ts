import { Schema, model, models } from "mongoose";

const planSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    duration: {
      type: String,
      default: "monthly",
    },
    description: String,
    features: [String],
    isPopular: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default models.Plan || model("Plan", planSchema);