import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/db/config";
import Item from "@/models/Item";

export async function PUT(
  req: NextRequest,
  context: { params: { id: string } }
) {
  try {
    await dbConnect();

    const { id } = context.params;
    const { status } = await req.json();

    const updatedItem = await Item.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedItem) {
      return NextResponse.json(
        { message: "Item not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Item updated", item: updatedItem },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating item:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
