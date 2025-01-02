"use client";

import React, { useEffect, useState } from "react";
import { Consultant, Service } from "../../types/consulting"; // Adjust the import path as necessary

const ConsultingPage: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true); // Loading state

  useEffect(() => {
    const fetchServices = async () => {
      try {
        console.log('Fetching services from API...'); // Add this log
        const response = await fetch("/api/services", {
          method: "GET", // Ensure the GET method is used
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`API error: ${response.statusText} - ${errorText}`);
        }

        const data: Service[] = await response.json();
        console.log('Services fetched:', data); // Add this log
        setServices(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching services:", err);
        setError("Failed to fetch services. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchServices();
  }, []);

  return (
    <main className="min-h-screen bg-[var(--color-background)] py-8">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[var(--color-primary)] mb-4" style={{ fontFamily: 'var(--font-hero)' }}>
            Welcome to Our Consulting Services
          </h1>
          <p className="text-lg text-[var(--color-text)]" style={{ fontFamily: 'var(--font-body)' }}>
            Our team of expert consultants is here to help you navigate your business challenges and achieve your goals.
          </p>
        </section>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center">
            <p className="text-[var(--color-accent)]">Loading services...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="flex justify-center items-center">
            <p className="text-[var(--color-error)]">{error}</p>
          </div>
        )}

        {/* Services List */}
        {!isLoading && !error && (
          <section>
            {services.length === 0 ? (
              <p className="text-[var(--color-text)] text-center">No services available at the moment.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((service) => (
                  <div key={service.id} className="bg-[var(--color-secondary)] p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold text-[var(--color-primary)] mb-2" style={{ fontFamily: 'var(--font-header)' }}>
                      {service.name}
                    </h2>
                    <p className="text-[var(--color-text)] mb-4" style={{ fontFamily: 'var(--font-body)' }}>{service.description}</p>
                    {service.availability === "AVAILABLE" ? (
                      <div>
                        <h3 className="text-lg font-semibold mb-2" style={{ fontFamily: 'var(--font-header)', color: 'var(--color-accent)' }}>
                          Consultants:
                        </h3>
                        <ul className="list-disc list-inside">
                          {service.consultants.map((consultant: Consultant) => (
                            <li key={consultant.id} className="mb-2">
                              <span className="font-medium text-[var(--color-text)]" style={{ fontFamily: 'var(--font-body)' }}>
                                {consultant.name}
                              </span>
                              <a
                                href={consultant.calendlyLink || "#"}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[var(--color-accent)] hover:underline ml-2"
                                style={{ fontFamily: 'var(--font-body)' }}
                              >
                                Book with {consultant.name}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <p className="text-[var(--color-error)] mt-4" style={{ fontFamily: 'var(--font-body)' }}>
                        This service is not available at this time.
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>
        )}
      </div>
    </main>
  );
};

export default ConsultingPage;