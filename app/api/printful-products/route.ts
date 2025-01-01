import { NextResponse } from "next/server";
import axios from "axios";

export async function GET() {
  const apiUrl = "https://api.printful.com/products";
  const apiKey = process.env.PRINTFUL_API_KEY;

  try {
    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });

    const products = response.data.result; // Adjust according to Printful API response
    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products from Printful:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}
