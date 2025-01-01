"use client";

import { useEffect, useState } from "react";

type Lesson = {
  id: number;
  title: string;
  videoUrl: string;
};

type Section = {
  id: number;
  title: string;
  lessons: Lesson[];
};

type Class = {
  id: number;
  title: string;
  description: string;
  sections: Section[];
};

export default function ClassDetailsPage({ params }: { params: { id: string } }) {
  const [classItem, setClassItem] = useState<Class | null>(null);

  useEffect(() => {
    async function fetchClass() {
      const response = await fetch(`/api/classes/${params.id}`);
      const data = await response.json();
      setClassItem(data);
    }
    fetchClass();
  }, [params.id]);

  if (!classItem) {
    return <p>Loading class details...</p>;
  }

  return (
    <main className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-4">{classItem.title}</h1>
      <p className="text-gray-700 mb-6">{classItem.description}</p>
      {classItem.sections.map((section) => (
        <div key={section.id} className="mb-6">
          <h2 className="text-2xl font-bold">{section.title}</h2>
          <ul>
            {section.lessons.map((lesson) => (
              <li key={lesson.id} className="mt-2">
                <a
                  href={lesson.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {lesson.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </main>
  );
}
