"use client";

import { useCart } from "../context/CartContext";
import Image from "next/image";
import Link from "next/link";

export default function CheckoutPage() {
  const { cartItems, removeFromCart, clearCart } = useCart();

  const handleCheckout = async () => {
    try {
      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        body: JSON.stringify({ items: cartItems }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const { url } = await response.json();

      // Redirect to Stripe checkout
      window.location.href = url;
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <main className="bg-[var(--color-background)] text-[var(--color-text)] min-h-screen py-12">
      <section className="container mx-auto">
        <h1 className="text-5xl font-extrabold text-[var(--color-primary)] mb-8 text-center">Your Cart</h1>

        {cartItems.length === 0 ? (
          <div className="text-center">
            <p className="text-lg mb-6">Your cart is empty. Browse our amazing products and find something you love!</p>
            <Link href="/products" legacyBehavior>
              <a className="bg-[var(--color-accent)] text-[var(--color-secondary)] px-6 py-3 rounded shadow hover:bg-[var(--color-primary)] hover:text-[var(--color-text)] transition">Continue Shopping</a>
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-6">
              {/* Cart Items */}
              <div className="col-span-2">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-[var(--color-secondary)] p-6 rounded-lg shadow-lg mb-4 flex items-center gap-4 transition-transform transform hover:scale-105"
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={100}
                      height={100}
                      className="rounded"
                    />
                    <div className="flex-grow">
                      <h3 className="text-2xl font-bold text-[var(--color-primary)]">{item.name}</h3>
                      <p className="text-[var(--color-text)]">Quantity: {item.quantity}</p>
                      <p className="text-[var(--color-accent)] font-semibold">Price: ${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                    <button
                      className="text-[var(--color-error)] hover:underline"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>

              {/* Summary Section */}
              <div className="bg-[var(--color-secondary)] p-8 rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold text-[var(--color-primary)] mb-6">Order Summary</h2>
                <p className="text-[var(--color-text)] text-lg mb-4">Total Items: {cartItems.length}</p>
                <p className="text-[var(--color-accent)] text-xl font-bold mb-8">Total Price: ${totalPrice.toFixed(2)}</p>
                <button
                  className="w-full bg-[var(--color-accent)] text-[var(--color-text)] py-3 rounded shadow-lg hover:bg-[var(--color-primary)] transition text-lg font-semibold"
                  onClick={handleCheckout}
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>

            <div className="text-center mt-8">
              <Link href="/products">
                <a className="text-[var(--color-secondary)] underline text-lg font-medium hover:text-[var(--color-secondary)]">
                  Continue Shopping
                </a>
              </Link>
            </div>
          </>
        )}
      </section>
    </main>
  );
}