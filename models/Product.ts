import { Schema, model, models } from "mongoose";

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
    },

    stock: {
      type: Number,
      required: true,
    },

    sales: {
      type: Number,
      default: 0,
    },

    image: {
      type: String,
      default: "",
    },

    description: {
      type: String,
      default: "",
    },

    rating: {
      type: Number,
      default: 5,
    },

    isNewProduct: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default models.Product || model("Product", productSchema);