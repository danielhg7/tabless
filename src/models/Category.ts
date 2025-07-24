import mongoose, { Schema, Types } from 'mongoose'
import { Subcategory } from '../interfaces/Subcategory';

export interface CategoryDocument extends Document {
    id: string;
    name: string;
    restaurantId: Types.ObjectId;
    subcategories: Subcategory[];
    isActive: boolean;
}

const SubcategorySchema = new Schema<Subcategory>(
    {
      id: String,
      name: { type: String, required: true },
      type: { type: String, required: true },
    }
);

const CategorySchema = new Schema<CategoryDocument>(
    {
        name: { type: String, required: true },
        restaurantId: { type: Schema.Types.ObjectId, ref: 'Restaurant', required: true },
        subcategories: { type: [SubcategorySchema], default: [] },
        isActive: { type: Boolean, required: false },
    },
    {
        timestamps: true,
    }
);

export const Category = mongoose.models.Category || mongoose.model('Category', CategorySchema);
