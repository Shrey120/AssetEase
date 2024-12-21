import { NextResponse } from "next/server";
import Item from "@/models/Item";

export async function GET(
  req: Request,
  { params }: { params: Record<string, string> }
) {
  try {
    const categoryId = params.categoryId; // Access categoryId from params

    // Fetch items from the database for the given categoryId
    const items = await Item.find({ categoryId });

    // Send a success response with the items
    return NextResponse.json(
      {
        message: "Items fetched successfully",
        items,
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
