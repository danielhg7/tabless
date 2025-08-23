import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongoose";
import { Restaurant } from "@/models/Restaurant";
import { Category, CategoryDocument } from "@/models/Category";
import { Subcategory } from "@/interfaces/Subcategory";
import { Item } from "@/interfaces/Item";
import { MenuResponse } from "@/interfaces/MenuResponse";
import { MenuItemModel } from "@/models/MenuItem";
//import { menu } from "@/data/menu";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get('slug');

    if (!slug) {
      return NextResponse.json(
        { error: "Falta el parámetro slug" },
        { status: 400 }
      );
    }

    //return NextResponse.json(menu);

    await connectToDB();

    const restaurant = await Restaurant.findOne({ slug });

    if (!restaurant) {
      return NextResponse.json({ error: "Restaurant no encontrado" }, { status: 404 });
    }

    console.log("Restaurant: ", restaurant)

    const categories = await Category.find({
      restaurantId: restaurant._id,
      isActive: true
    })

    if (!categories) {
      return NextResponse.json(
        { error: "Categories were not found" },
        { status: 404 }
      );
    }

    console.log("Categories: ", categories)

    const itemsByCategories: Item[] = (
      await Promise.all(
        categories.map(async (category) =>
          MenuItemModel.find({ categoryId: category._id })
        )
      )
    ).flat()

    const response = {
      restaurant,
      categories,
      items: itemsByCategories
    }


    console.log("Items: ", itemsByCategories)


    if (itemsByCategories.length === 0) {
      return NextResponse.json(
        { error: "Menú no encontrado para el restaurantId proporcionado" },
        { status: 404 }
      );
    }

    console.log("RESPONSE: ", transformData(response))
    return NextResponse.json(transformData(response));

  } catch(error) {
    console.error("Error en GET /api/restaurant/menu", JSON.stringify(error));
    return NextResponse.json({ error: JSON.stringify(error) }, { status: 500 });
  }
}

const transformData = (data: MenuResponse) => {
  const { restaurant, categories, items } = data;

  const transformedCategories = categories.map((category: CategoryDocument) => {
    const transformedSubcategories = category.subcategories.map((sub: Subcategory) => {
      const itemsForSub = items
        .filter((item: Item) => item.subcategoryId === sub.id)
        .map(({ _id, name, description, price, imageUrl, count=0  }) => ({ _id, name, description, price, imageUrl, count }));

      return {
        id: sub.id,
        name: sub.name,
        ...(itemsForSub.length > 0 && { items: itemsForSub })
      };
    });

    const result = {
      name: category.name,
      ...(category.id && { id: category.id }),
      ...(transformedSubcategories.length > 0 && { subcategories: transformedSubcategories })
    };

    return result;
  });

  return {
    restaurant,
    categories: transformedCategories
  };
}
