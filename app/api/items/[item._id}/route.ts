import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/db/config";
import Item from "@/models/Item";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await dbConnect();
    const { status } = await req.json();

    const updatedItem = await Item.findByIdAndUpdate(
      params.id,
      { status },
      { new: true }
    );

    return NextResponse.json(
      { message: "Item updated", item: updatedItem },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error updating item:", err);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
