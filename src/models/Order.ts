import { CartItem } from "@/interfaces/CartItem";
import mongoose, { Schema } from 'mongoose'

const OrderItemSchema = new Schema<CartItem>(
    {
      id: { type: String, required: true },
      name: { type: String, required: true },
      count: { type: Number, required: true },
      status: { type: String, required: true },
      price: { type: Number, required: true },
    }
);

const OrderSchema = new Schema({
    id: String,
    tableId: String,
    status: String,
    items: { type: [OrderItemSchema], default: [] },
    createdAt: Date,
    updatedAt: Date
  }, { timestamps: true });

export const Order = mongoose.models.Order || mongoose.model("Order", OrderSchema);