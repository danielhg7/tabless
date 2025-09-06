import mongoose from "mongoose";

const TableSchema = new mongoose.Schema({
  tableId: String,
  number: Number,
  restaurantId: String,
  isActive: Boolean
}, { timestamps: true });

export const Table = mongoose.models.Table || mongoose.model("Table", TableSchema);