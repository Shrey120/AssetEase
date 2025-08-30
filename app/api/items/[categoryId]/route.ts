
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/db/config";
import Item from "@/models/Item";


type Params = Promise<{ categoryId: string }>;

export async function GET(
  req: Request,
  { params }: { params: Params }
): Promise<NextResponse> {
  try {
    const { categoryId } = await params; // Correctly access categoryId
    // Fetch all categories from the database
    const items = await Item.find({
      categoryId: categoryId,
    });

    // Send a success response with the items
    return NextResponse.json(
      {
        message: "Items fetched successfully",
        items: items,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching items:", error);

    // Send a failure response with status 500
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}


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