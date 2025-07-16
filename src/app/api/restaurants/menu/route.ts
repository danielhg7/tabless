import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongoose";
import { Restaurant } from "@/models/Restaurant";
import { MenuItem } from "@/models/MenuItem";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");

    console.log(slug);

    if (!slug) {
      return NextResponse.json(
        { error: "Falta el parámetro slug" },
        { status: 400 }
      );
    }

    await connectToDB();

    const restaurant = await Restaurant.findOne({ slug });

    if (!restaurant) {
      return NextResponse.json({ error: "Restaurant no encontrado" }, { status: 404 });
    }

    const menuItems = await MenuItem.find({
      restaurantId: restaurant._id,
    });

    if (!menuItems) {
      return NextResponse.json(
        { error: "Menú no encontrado para el restaurantId proporcionado" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      menu: menuItems.map( each => {
        return {
          id: String(each._id),
          name: each.name,
          description: each.description,
          price: each.price,
          imageUrl: each.imageUrl
        }
      }),
    });
  } catch(error) {
    console.error("Error en GET /api/restaurant/menu", JSON.stringify(error));
    return NextResponse.json({ error: JSON.stringify(error) }, { status: 500 });
  }
}
