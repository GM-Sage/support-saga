"use client";

// Import necessary React and Next.js features
import React, { useState, ChangeEvent, useEffect } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";

// Define the fetcher function for SWR
// It includes error handling to catch non-JSON responses
const fetcher = async (url: string, accessToken?: string) => {
  try {
    const response = await fetch(url, {
      headers: accessToken
        ? {
            Authorization: `Bearer ${accessToken}`,
          }
        : {},
    });

    // Throw an error if the response is not OK (status not in the range 200-299)
    if (!response.ok) {
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const errorData = await response.json();
        throw new Error(errorData.message || "An error occurred while fetching data.");
      } else {
        const errorText = await response.text();
        throw new Error(`Unexpected response: ${errorText}`);
      }
    }

    return response.json();
  } catch (error) {
    // Re-throw the error to be caught by SWR
    throw error;
  }
};

// Define interfaces for Lesson and Class
interface Lesson {
  id: number;
  title: string;
  duration: string;
}

interface Class {
  id: number;
  title: string;
  description: string;
  image: string;
  lessons?: Lesson[];
}

export default function ClassesPage() {
  const { data: session, status } = useSession();
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Pagination State
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 6; // Number of classes per page

  // Fetch available classes using SWR
  const {
    data: availableClasses,
    error: errorAvailable,
    isValidating: isValidatingAvailable,
  } = useSWR<Class[]>("/api/classes/available", fetcher);

  // Fetch purchased classes using SWR if authenticated
  const {
    data: purchasedClasses,
    error: errorPurchased,
    isValidating: isValidatingPurchased,
  } = useSWR<Class[]>(
    status === "authenticated" ? "/api/classes/purchased" : null,
    (url: string) => fetcher(url, session?.accessToken)
  );

  // Handle Search Input Change
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page on new search
  };

  // Filter Classes Based on Search Query
  const filterClasses = (classes: Class[] | undefined) => {
    if (!classes) return [];
    return classes.filter((cls) =>
      cls.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  // Filtered Available and Purchased Classes
  const filteredAvailableClasses = filterClasses(availableClasses);
  const filteredPurchasedClasses = filterClasses(purchasedClasses);

  // Calculate total pages for available classes
  const totalPagesAvailable = filteredAvailableClasses
    ? Math.ceil(filteredAvailableClasses.length / itemsPerPage)
    : 0;

  // Determine classes to display on the current page
  const paginatedAvailableClasses = filteredAvailableClasses
    ? filteredAvailableClasses.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      )
    : [];

  // Handle Page Change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Accessibility: Handle keyboard navigation for pagination
  const handleKeyPressPagination = (e: React.KeyboardEvent<HTMLButtonElement>, page: number) => {
    if (e.key === "Enter" || e.key === " ") {
      handlePageChange(page);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow bg-[var(--color-background)] text-[var(--color-text)] py-12">
        <section className="container mx-auto">
          <h1 className="text-4xl font-bold text-[var(--color-primary)] mb-6 text-center">
            Our Classes
          </h1>

          {/* Search Bar */}
          <div className="mb-8 flex justify-center">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search classes..."
              className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              aria-label="Search Classes"
            />
          </div>

          {/* If a class is selected, display its details */}
          {selectedClass && (
            <section className="mb-12">
              <Link href="/classes">
                <a
                  className="inline-block bg-[var(--color-accent)] text-[var(--color-text)] px-4 py-2 rounded shadow hover:bg-[var(--color-primary)] transition mb-4"
                  onClick={() => setSelectedClass(null)}
                  aria-label="Back to All Classes"
                >
                  &larr; Back to All Classes
                </a>
              </Link>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Class Image */}
                <div>
                  <Image
                    src={selectedClass.image}
                    alt={selectedClass.title}
                    width={600}
                    height={400}
                    className="rounded-lg shadow-lg"
                    placeholder="blur"
                    blurDataURL="/images/placeholder.png" // Replace with your actual placeholder
                  />
                </div>
                {/* Class Details */}
                <div>
                  <h2 className="text-3xl font-bold text-[var(--color-primary)] mb-4">
                    {selectedClass.title}
                  </h2>
                  <p className="text-lg text-[var(--color-text)] mb-6">
                    {selectedClass.description}
                  </p>
                  {/* Lessons List */}
                  {selectedClass.lessons && (
                    <>
                      <h3 className="text-2xl font-bold text-[var(--color-primary)] mb-4">
                        Lessons
                      </h3>
                      <ul className="space-y-4">
                        {selectedClass.lessons.map((lesson) => (
                          <li
                            key={lesson.id}
                            className="bg-[var(--color-secondary)] p-4 rounded-lg shadow hover:shadow-lg transition"
                          >
                            <h4 className="text-lg font-semibold text-[var(--color-primary)] mb-2">
                              {lesson.title}
                            </h4>
                            <p className="text-[var(--color-text)]">
                              Duration: {lesson.duration}
                            </p>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                  {/* Access Course Button (Visible Only if Purchased) */}
                  {status === "authenticated" &&
                    purchasedClasses?.some(
                      (cls) => cls.id === selectedClass.id
                    ) && (
                      <Link href={`/courses/${selectedClass.id}`}>
                        <a className="mt-6 inline-block bg-[var(--color-primary)] text-white px-6 py-3 rounded-lg shadow hover:shadow-xl transition">
                          Access Course
                        </a>
                      </Link>
                    )}
                </div>
              </div>
            </section>
          )}

          {/* If no class is selected, show purchased and available classes */}
          {!selectedClass && (
            <>
              {/* Display Purchased Classes Only if User is Authenticated */}
              {status === "authenticated" && (
                <section className="mb-12">
                  <h2 className="text-2xl font-bold text-[var(--color-primary)] mb-4">
                    Your Purchased Classes
                  </h2>
                  {errorPurchased ? (
                    // Render the error message instead of the error object
                    <p className="text-center text-lg text-red-500">
                      Error: {errorPurchased.message}
                    </p>
                  ) : isValidatingPurchased ? (
                    <p className="text-center text-lg text-[var(--color-primary)]">
                      Loading your purchased classes...
                    </p>
                  ) : filteredPurchasedClasses.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {filteredPurchasedClasses.map((cls) => (
                        <div
                          key={cls.id}
                          className="bg-[var(--color-secondary)] p-6 rounded-lg shadow hover:shadow-lg transition cursor-pointer"
                          onClick={() => setSelectedClass(cls)}
                          tabIndex={0}
                          role="button"
                          aria-pressed="false"
                          onKeyPress={(e) => {
                            if (e.key === "Enter") setSelectedClass(cls);
                          }}
                        >
                          <Image
                            src={cls.image}
                            alt={cls.title}
                            width={400}
                            height={250}
                            className="rounded mb-4"
                            placeholder="blur"
                            blurDataURL="/images/placeholder.png" // Replace with your actual placeholder
                          />
                          <h3 className="text-xl font-bold text-[var(--color-primary)] mb-2">
                            {cls.title}
                          </h3>
                          <p className="text-[var(--color-text)]">
                            {cls.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-lg text-[var(--color-text)]">
                      You haven't purchased any classes yet. Browse our
                      available classes and start learning today!
                    </p>
                  )}
                </section>
              )}

              {/* Display Available Classes to All Users */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-[var(--color-primary)] mb-4">
                  Available Classes
                </h2>
                {errorAvailable ? (
                  // Render the error message instead of the error object
                  <p className="text-center text-lg text-red-500">
                    Error: {errorAvailable.message}
                  </p>
                ) : isValidatingAvailable ? (
                  <p className="text-center text-lg text-[var(--color-primary)]">
                    Loading available classes...
                  </p>
                ) : filteredAvailableClasses.length > 0 ? (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {paginatedAvailableClasses.map((cls) => (
                        <div
                          key={cls.id}
                          className="bg-[var(--color-secondary)] p-6 rounded-lg shadow hover:shadow-lg transition cursor-pointer"
                          onClick={() => setSelectedClass(cls)}
                          tabIndex={0}
                          role="button"
                          aria-pressed="false"
                          onKeyPress={(e) => {
                            if (e.key === "Enter") setSelectedClass(cls);
                          }}
                        >
                          <Image
                            src={cls.image}
                            alt={cls.title}
                            width={400}
                            height={250}
                            className="rounded mb-4"
                            placeholder="blur"
                            blurDataURL="/images/placeholder.png" // Replace with your actual placeholder
                          />
                          <h3 className="text-xl font-semibold text-[var(--color-primary)] mb-2">
                            {cls.title}
                          </h3>
                          <p className="text-[var(--color-text)]">
                            {cls.description}
                          </p>
                          {/* Purchase Button */}
                          {status === "authenticated" ? (
                            <Link href={`/purchase/${cls.id}`}>
                              <a className="mt-4 inline-block bg-[var(--color-primary)] text-white px-4 py-2 rounded-lg shadow hover:shadow-xl transition">
                                Purchase
                              </a>
                            </Link>
                          ) : (
                            <Link href="/account">
                              <a className="mt-4 inline-block bg-[var(--color-accent)] text-[var(--color-text)] px-4 py-2 rounded-lg shadow hover:bg-[var(--color-primary)] transition">
                                Sign In to Purchase
                              </a>
                            </Link>
                          )}
                        </div>
                      ))}
                    </div>
                    {/* Pagination Controls */}
                    {totalPagesAvailable > 1 && (
                      <div className="flex justify-center mt-8 space-x-2">
                        {Array.from({ length: totalPagesAvailable }, (_, index) => (
                          <button
                            key={index + 1}
                            onClick={() => handlePageChange(index + 1)}
                            onKeyPress={(e) =>
                              handleKeyPressPagination(e, index + 1)
                            }
                            className={`px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]
                              ${
                                currentPage === index + 1
                                  ? "bg-[var(--color-primary)] text-white"
                                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                              }`}
                            aria-label={`Go to page ${index + 1}`}
                          >
                            {index + 1}
                          </button>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <p className="text-center text-lg text-[var(--color-text)]">
                    No available classes matching your search.
                  </p>
                )}
              </section>
            </>
          )}
        </section>
      </main>
    </div>
  );
}