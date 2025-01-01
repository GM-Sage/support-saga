"use client";

import { useState } from "react";

export default function OperationsManagementPage() {
  const [selectedDate, setSelectedDate] = useState("");

  const handleAddToCart = () => {
    if (!selectedDate) {
      alert("Please select a date and time before adding to your cart.");
      return;
    }
    alert(`Operations Management Consulting added to cart for ${selectedDate}`);
  };

  return (
    <main className="bg-[var(--color-background)] text-[var(--color-text)] min-h-screen py-12">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-[var(--color-primary)] mb-6 text-center">
          Operations Management Consulting
        </h1>
        <p className="text-lg leading-relaxed text-center mb-8">
          Optimize your workflows and increase productivity with our operations management
          consulting services.
        </p>
        <div className="text-center">
          <img
            src="/images/operationsmanagement.jpg"
            alt="Operations Management Consulting"
            className="mx-auto rounded-lg shadow-lg max-w-md mb-6"
          />
        </div>

        <div className="text-center">
          <label className="block text-lg font-medium mb-2">
            Select Date and Time:
          </label>
          <input
            type="datetime-local"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-4 py-2 rounded bg-[var(--color-background)] text-[var(--color-text)] border border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] mb-4"
          />
          <button
            onClick={handleAddToCart}
            className="bg-[var(--color-accent)] text-[var(--color-secondary)] px-6 py-3 rounded shadow hover:bg-[var(--color-primary)] hover:text-[var(--color-text)] transition font-semibold"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </main>
  );
}
