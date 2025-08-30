import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  purchaseUrl: { type: String, required: true },
  name: { type: String, required: true },
  imageUrl: { type: String, required: true },
  price: { type: Number, required: true },
  date: { type: Date, required: true },
  status: {
    type: String,
    enum: ["bought", "to buy"],
    default: "to buy",   // Default is "to buy"
  },
});

export default mongoose.models.Item || mongoose.model("Item", itemSchema);
