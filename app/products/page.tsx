"use client";

import { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Image from "next/image";
import Link from "next/link";

// Define the Product type for type safety
type Product = {
  id: string;
  name: string;
  price: number;
  imageUrl?: string;
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch("/api/printful-products");

        // Check if the response is successful
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || `HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        // Ensure that data is an array
        if (!Array.isArray(data)) {
          throw new Error('Unexpected data format received from the server.');
        }

        setProducts(
          data.map((item: any) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            imageUrl: item.thumbnail_url,
          }))
        );
      } catch (error: any) {
        console.error("Error fetching products:", error.message);
        setError(error.message || 'Failed to fetch products.');
      } finally {
        setIsLoading(false);
      }
    }
    fetchProducts();
  }, []);

  return (
    <main className="bg-[var(--color-background)] text-[var(--color-text)]">
      {/* Hero Section */}
      <section className="relative">
        <Carousel
          showThumbs={false}
          infiniteLoop={true}
          autoPlay={true}
          interval={5000}
          showStatus={false}
          className="max-w-7xl mx-auto"
        >
          {[
            // Carousel Slide 1
            <div className="relative" key="slide1">
              <Image
                src="/images/spotlight1.jpg"
                alt="Spotlight 1"
                width={1600}
                height={600}
                className="rounded-lg shadow-lg object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black/70 flex flex-col justify-center items-center text-center">
                <h2 className="text-3xl md:text-5xl font-bold text-[var(--color-text)]">
                  Gear Up For Adventure
                </h2>
                <p className="mt-4 text-lg md:text-xl text-[var(--color-text)]">
                  Explore the best gear for your journey!
                </p>
                <Link
                  href="/products"
                  className="mt-6 button px-6 py-3 bg-[var(--color-primary)] text-[var(--color-text)] rounded-full hover:bg-[var(--color-hover)] transition-all"
                >
                  Shop Now
                </Link>
              </div>
            </div>,

            // Carousel Slide 2
            <div className="relative" key="slide2">
              <Image
                src="/images/spotlight2.jpg"
                alt="Spotlight 2"
                width={1600}
                height={600}
                className="rounded-lg shadow-lg object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black/70 flex flex-col justify-center items-center text-center">
                <h2 className="text-3xl md:text-5xl font-bold text-[var(--color-text)]">
                  Discover New Adventures
                </h2>
                <p className="mt-4 text-lg md:text-xl text-[var(--color-text)]">
                  Find gear that supports your passion!
                </p>
                <Link
                  href="/products"
                  className="mt-6 button px-6 py-3 bg-[var(--color-primary)] text-[var(--color-text)] rounded-full hover:bg-[var(--color-hover)] transition-all"
                >
                  Explore Now
                </Link>
              </div>
            </div>,
          ]}
        </Carousel>
      </section>

      {/* Featured Products Section */}
      <section className="py-12">
        <div className="container mx-auto">
          <h2 className="text-center text-4xl font-bold mb-12 text-[var(--color-primary)]">
            Featured Products
          </h2>

          {/* Display Error Message */}
          {error && (
            <p className="text-center text-red-500 mb-4">{error}</p>
          )}

          {/* Display Loading Indicator */}
          {isLoading ? (
            <p className="text-center text-lg">Loading products...</p>
          ) : products.length === 0 ? (
            <p className="text-center text-lg">No products available at the moment.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-[var(--color-secondary)] text-center rounded-lg shadow-lg p-6 hover:shadow-2xl transition-transform transform hover:scale-105"
                >
                  <Image
                    src={product.imageUrl || "/images/default-product.jpg"}
                    alt={product.name}
                    width={300}
                    height={300}
                    className="rounded-lg"
                  />
                  <h3 className="text-lg font-bold mt-4 text-[var(--color-primary)]">
                    {product.name}
                  </h3>
                  <p className="text-[var(--color-accent)] mt-2 text-lg">
                    ${product.price.toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}