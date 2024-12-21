import { NextResponse } from "next/server";
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
