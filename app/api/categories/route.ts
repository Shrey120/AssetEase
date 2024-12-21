import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/db/config";
import Category from "@/models/Category";

// API route to handle adding a new category
export async function POST(req: NextRequest) {
  try {
    // Connect to MongoDB
    await dbConnect();

    // Parse the request body using req.json() for NextRequest
    const { name, imageUrl }: { name: string; imageUrl: string } =
      await req.json();

    // Create a new category document
    const newCategory = new Category({
      name,
      imageUrl,
      createdAt: new Date(),
    });

    // Save the new category to the database
    await newCategory.save();

    // Send a success response with status 201
    return NextResponse.json(
      {
        message: "Category added successfully",
        category: newCategory,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating category:", error);

    // Send a failure response with status 500
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Connect to MongoDB
    await dbConnect();

    // Fetch all categories from the database
    const categories = await Category.find();

    // Send a success response with the categories
    return NextResponse.json(
      {
        message: "Categories fetched successfully",
        categories: categories,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching categories:", error);

    // Send a failure response with status 500
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
