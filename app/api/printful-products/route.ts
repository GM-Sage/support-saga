// File: app/api/printful-products/route.ts

import { NextRequest, NextResponse } from 'next/server';

// Define the structure of each product as returned by Printful
type PrintfulProduct = {
  id: string;
  name: string;
  price: number;
  thumbnail_url?: string;
};

// Define the API endpoint handler
export async function GET(request: NextRequest) {
  try {
    // Replace with your actual Printful API endpoint and authentication
    const printfulApiUrl = 'https://api.printful.com/products';
    const response = await fetch(printfulApiUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer YOUR_PRINTFUL_API_KEY`,
        'Content-Type': 'application/json',
      },
    });

    // Check if the Printful API responded successfully
    if (!response.ok) {
      throw new Error(`Printful API error: ${response.statusText}`);
    }

    const data = await response.json();

    // Ensure the data structure is as expected
    if (!Array.isArray(data.result)) {
      throw new Error('Unexpected data format from Printful API.');
    }

    // Map the Printful products to your Product type
    const products: PrintfulProduct[] = data.result.map((item: any) => ({
      id: item.id,
      name: item.name,
      price: item.price,
      thumbnail_url: item.thumbnail_url,
    }));

    // Return the products as JSON
    return NextResponse.json(products);
  } catch (error: any) {
    console.error('Error in /api/printful-products:', error.message);
    // Return a 500 Internal Server Error response
    return NextResponse.json(
      { error: 'Failed to fetch products.' },
      { status: 500 }
    );
  }
}