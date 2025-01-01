"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
}

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await fetch(`/api/products/${params.id}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    }
    fetchProduct();
  }, [params.id]);

  if (!product) {
    return <p className="text-center py-20">Loading product details...</p>;
  }

  return (
    <div className="container mx-auto py-20">
      <h1 className="text-4xl font-bold mb-6 text-center">{product.name}</h1>
      <div className="flex flex-col items-center md:flex-row md:items-start gap-10">
        <Image
          src={product.imageUrl || "/default-product.jpg"}
          alt={product.name}
          width={400}
          height={400}
          className="rounded shadow"
        />
        <div>
          <p className="text-lg text-gray-700 mb-4">{product.description}</p>
          <p className="text-2xl font-semibold text-[var(--color-primary)]">
            ${product.price.toFixed(2)}
          </p>
          <button className="mt-6 bg-[var(--color-secondary)] text-white px-6 py-2 rounded hover:bg-[var(--color-primary)] transition">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
