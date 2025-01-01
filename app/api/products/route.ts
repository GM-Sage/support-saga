import { NextResponse } from "next/server";

// Mock data for products (replace with database query in production)
const products = [
  { id: "1", name: "Product 1", price: 29.99, description: "Amazing product 1", imageUrl: "/images/product1.jpg" },
  { id: "2", name: "Product 2", price: 39.99, description: "Incredible product 2", imageUrl: "/images/product2.jpg" },
  { id: "3", name: "Product 3", price: 49.99, description: "Fantastic product 3", imageUrl: "/images/product3.jpg" },
];

export async function GET() {
  return NextResponse.json(products);
}
