import { Schema, model, models } from "mongoose";

const contactSchema = new Schema(
  {
    name: String,
    email: String,
    phone: String,
    subject: String,
    message: String,
    status: {
      type: String,
      default: "new",
    },
  },
  { timestamps: true }
);

export default models.Contact || model("Contact", contactSchema);