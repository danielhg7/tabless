import mongoose from "mongoose";

const MenuItemSchema = new mongoose.Schema({
  name: String,
  price: Number,
  currency: String,
  description: String,
  category: String,
  imageUrl: String,
  available: Boolean,
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant", // permite usar populate()
    required: true,
  },
  subcategoryId: String
}, { timestamps: true });

export const MenuItemModel = mongoose.models.MenuItem || mongoose.model("MenuItem", MenuItemSchema);
