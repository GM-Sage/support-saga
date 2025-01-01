"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";

type Lesson = {
  id: number;
  title: string;
  duration: string;
};

type Class = {
  id: number;
  title: string;
  description: string;
  image: string;
  lessons?: Lesson[];
};

export default function ClassesPage() {
  const { data: session, status } = useSession();

  // Add logging to debug session and status
  useEffect(() => {
    console.log('Session:', session);
    console.log('Status:', status);
  }, [session, status]);

  const [selectedClass, setSelectedClass] = useState<Class | null>(null);

  const purchasedClasses: Class[] = [
    {
      id: 1,
      title: "Introduction to Business Management",
      description: "Learn the basics of managing a successful business.",
      image: "/images/class-business-management.jpg",
      lessons: [
        { id: 1, title: "Lesson 1: Understanding Management", duration: "10 min" },
        { id: 2, title: "Lesson 2: Strategic Thinking", duration: "15 min" },
      ],
    },
    {
      id: 2,
      title: "Advanced Customer Service Skills",
      description: "Master the skills to provide top-notch customer support.",
      image: "/images/class-customer-service.jpg",
      lessons: [
        { id: 1, title: "Lesson 1: Handling Difficult Customers", duration: "12 min" },
        { id: 2, title: "Lesson 2: Building Customer Loyalty", duration: "20 min" },
      ],
    },
  ];

  const availableClasses: Class[] = [
    {
      id: 3,
      title: "Leadership Essentials",
      description: "Develop the core skills to lead effectively.",
      image: "/images/class-leadership.jpg",
    },
    {
      id: 4,
      title: "Technical Support Fundamentals",
      description: "Learn the essential skills to excel in tech support.",
      image: "/images/class-tech-support.jpg",
    },
  ];

  if (status === "loading") {
    return <p className="text-center text-lg text-[var(--color-primary)]">Loading session...</p>;
  }

  if (status === "unauthenticated") {
    return (
      <p className="text-center text-lg text-[var(--color-primary)]">
        Please <a href="/account" className="text-[var(--color-accent)] underline">sign in</a> to view this page.
      </p>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow bg-[var(--color-background)] text-[var(--color-text)] py-12">
        <section className="container mx-auto">
          <h1 className="text-4xl font-bold text-[var(--color-primary)] mb-6 text-center">
            Our Classes
          </h1>

          {selectedClass && (
            <section className="mb-12">
              <button
                className="bg-[var(--color-accent)] text-[var(--color-text)] px-4 py-2 rounded shadow hover:bg-[var(--color-primary)] transition mb-4"
                onClick={() => setSelectedClass(null)}
              >
                Back to All Classes
              </button>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <Image
                    src={selectedClass.image}
                    alt={selectedClass.title}
                    width={600}
                    height={400}
                    className="rounded-lg shadow-lg"
                  />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-[var(--color-primary)] mb-4">
                    {selectedClass.title}
                  </h2>
                  <p className="text-lg text-[var(--color-text)] mb-6">
                    {selectedClass.description}
                  </p>
                  <h3 className="text-2xl font-bold text-[var(--color-primary)] mb-4">
                    Lessons
                  </h3>
                  <ul className="space-y-4">
                    {selectedClass.lessons?.map((lesson) => (
                      <li
                        key={lesson.id}
                        className="bg-[var(--color-secondary)] p-4 rounded-lg shadow hover:shadow-lg transition"
                      >
                        <h4 className="text-lg font-semibold text-[var(--color-primary)] mb-2">
                          {lesson.title}
                        </h4>
                        <p className="text-[var(--color-text)]">Duration: {lesson.duration}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          )}

          {!selectedClass && (
            <>
              {purchasedClasses.length > 0 && (
                <section className="mb-12">
                  <h2 className="text-2xl font-bold text-[var(--color-primary)] mb-4">
                    Your Classes
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {purchasedClasses.map((cls) => (
                      <div
                        key={cls.id}
                        className="bg-[var(--color-secondary)] p-6 rounded-lg shadow hover:shadow-lg transition cursor-pointer"
                        onClick={() => setSelectedClass(cls)}
                      >
                        <Image
                          src={cls.image}
                          alt={cls.title}
                          width={400}
                          height={250}
                          className="rounded mb-4"
                        />
                        <h3 className="text-xl font-bold text-[var(--color-primary)] mb-2">
                          {cls.title}
                        </h3>
                        <p className="text-[var(--color-text)]">{cls.description}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              <section className="mb-12">
                <h2 className="text-2xl font-bold text-[var(--color-primary)] mb-4">
                  Available Classes
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {availableClasses.map((cls) => (
                    <div
                      key={cls.id}
                      className="bg-[var(--color-secondary)] p-6 rounded-lg shadow hover:shadow-lg transition cursor-pointer"
                      onClick={() => setSelectedClass(cls)}
                    >
                      <Image
                        src={cls.image}
                        alt={cls.title}
                        width={400}
                        height={250}
                        className="rounded mb-4"
                      />
                      <h3 className="text-xl font-semibold text-[var(--color-primary)] mb-2">
                        {cls.title}
                      </h3>
                      <p className="text-[var(--color-text)]">{cls.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            </>
          )}
        </section>
      </main>
    </div>
  );
}