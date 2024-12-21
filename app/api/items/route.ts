import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/db/config";
import Item from "@/models/Item";
import Category from "@/models/Category";
// API route to handle adding a new Item
export async function POST(req: NextRequest) {
  try {
    // Connect to MongoDB
    await dbConnect();

    // Parse the request body using req.json() for NextRequest
    const {
      name,
      imageUrl,
      price,
      purchaseUrl,
      categoryId,
    }: {
      name: string;
      imageUrl: string;
      price: number;
      purchaseUrl: string;
      categoryId: string;
    } = await req.json();

    // Create a new Item document
    const newItem = new Item({
      categoryId: categoryId,
      imageUrl: imageUrl,
      date: new Date(),
      purchaseUrl: purchaseUrl,
      price: price,
      name: name,
    });

    // Save the new Item to the database
    await newItem.save();

    await Category.findByIdAndUpdate(categoryId, {
      $inc: { totalAmount: price },
    });

    // Send a success response with status 201
    return NextResponse.json(
      {
        message: "Item added successfully",
        Item: newItem,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating Item:", error);

    // Send a failure response with status 500
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
