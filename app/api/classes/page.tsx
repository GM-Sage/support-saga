"use client";

import { useState, useEffect } from "react";

type Class = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
};

export default function ClassesPage() {
  const [classes, setClasses] = useState<Class[]>([]);

  useEffect(() => {
    async function fetchClasses() {
      const response = await fetch("/api/classes");
      const data = await response.json();
      setClasses(data);
    }
    fetchClasses();
  }, []);

  return (
    <main className="container mx-auto py-10">
      <h1 className="text-4xl font-bold text-center mb-8">Available Classes</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {classes.map((classItem) => (
          <div key={classItem.id} className="bg-white rounded shadow p-4">
            <img
              src={classItem.imageUrl}
              alt={classItem.title}
              className="rounded mb-4"
            />
            <h2 className="text-xl font-bold">{classItem.title}</h2>
            <p className="text-gray-700">{classItem.description}</p>
            <a
              href={`/classes/${classItem.id}`}
              className="text-blue-500 hover:underline mt-4 inline-block"
            >
              View Details
            </a>
          </div>
        ))}
      </div>
    </main>
  );
}
