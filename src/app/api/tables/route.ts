import { NextRequest, NextResponse } from "next/server";
import { Table } from "@/models/Table";
import { Order } from "@/models/Order";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const restaurantId = searchParams.get('restaurantId');
    const tableId = searchParams.get('tableId');

    if (!restaurantId || !tableId) {
      return NextResponse.json(
        { error: "No existe el parametro restaurant o numero de mesa" },
        { status: 400 }
      );
    }

    const table = await Table.findOne({ isActive: true, restaurantId, tableId });
    const order = await Order.findOne({ table: table.id });

    if (!table) {
      return NextResponse.json({ error: "La mesa no ha sido encontrada en el sistema" }, { status: 404 });
    }

    if (!order) {
      return NextResponse.json({ error: "No se ha encontrado pedido activo para esta mesa" }, { status: 200 });
    }

    const response = {
      table,
      order
    }

    return NextResponse.json(response);

  } catch(error) {
    console.error("Error en GET /api/restaurant/menu", JSON.stringify(error));
    return NextResponse.json({ error: JSON.stringify(error) }, { status: 500 });
  }
}