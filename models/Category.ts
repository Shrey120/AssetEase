import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  imageUrl: { type: String, required: true },
  totalAmount: { type: Number, required: true, default: 0 },
});

export default mongoose.models.Category ||
  mongoose.model("Category", categorySchema);
