import mongoose from "mongoose";

const RestaurantSchema = new mongoose.Schema({
  id: String,
  name: String,
  slug: { type: String, required: true, unique: true },
  type: String,
  isActive: Boolean,
  country: String,
  city: String
}, { timestamps: true });

export const Restaurant = mongoose.models.Restaurant || mongoose.model("Restaurant", RestaurantSchema);