// app/services/page.tsx

"use client"; // Ensures the component is rendered on the client side

import React, { useEffect, useState } from "react";
import { Service } from "../../types/consulting"; // Adjust the import path as necessary

/**
 * ServicesPage Component
 * Displays a list of services along with their associated consultants.
 */
const ServicesPage: React.FC = () => {
  // State to hold the list of services
  const [services, setServices] = useState<Service[]>([]);
  // State to manage loading status
  const [loading, setLoading] = useState<boolean>(true);
  // State to handle any errors during data fetching
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    /**
     * Fetch services from the API endpoint.
     * This function is called when the component mounts.
     */
    const fetchServices = async () => {
      try {
        const response = await fetch("/api/services/route"); // API endpoint to fetch services

        if (!response.ok) {
          // If the response is not OK, throw an error with status text
          const errorText = await response.text();
          throw new Error(`API error: ${response.statusText} - ${errorText}`);
        }

        const data: Service[] = await response.json(); // Parse the JSON data
        setServices(data); // Update the services state with fetched data
        setError(null); // Clear any previous errors
      } catch (err) {
        console.error("Error fetching services:", err);
        setError("Failed to fetch services. Please try again later."); // Update the error state
      } finally {
        setLoading(false); // Set loading to false regardless of success or failure
      }
    };

    fetchServices(); // Invoke the fetch function when the component mounts
  }, []); // Empty dependency array ensures this runs once on mount

  // Render loading state
  if (loading) {
    return (
      <div className="p-4">
        <p className="text-blue-500">Loading services...</p>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="p-4">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  // Render the list of services
  return (
    <div className="services-page">
      <h2 className="text-3xl mb-6">Our Services</h2>
      {services.length === 0 ? (
        <p className="text-gray-500">No services available at the moment.</p>
      ) : (
        services.map((service) => (
          <div key={service.id} className="service-card">
            <h3 className="text-2xl text-primary mb-2">{service.name}</h3>
            <p className="text-gray-700 mb-4">{service.description}</p>
            <p className="mb-4">
              <strong>Status:</strong>{" "}
              <span
                className={
                  service.availability === "AVAILABLE"
                    ? "text-green-500"
                    : "text-red-500"
                }
              >
                {service.availability}
              </span>
            </p>
            <h4 className="text-xl mb-2">Consultants Offering This Service:</h4>
            {service.consultants.length === 0 ? (
              <p className="text-gray-500">No consultants assigned to this service.</p>
            ) : (
              <ul className="list-disc list-inside">
                {service.consultants.map((consultant) => (
                  <li key={consultant.id} className="mb-2">
                    <span className="font-medium">{consultant.name}</span>
                    {consultant.calendlyLink && (
                      <a
                        href={consultant.calendlyLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-2 text-accent hover:underline"
                      >
                        Book a Consultation
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default ServicesPage;