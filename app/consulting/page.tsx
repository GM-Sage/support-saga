import { useEffect, useState } from 'react';
import { Consultant, Service } from '../types/consulting';

export default function ConsultingPage() {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    async function fetchServices() {
      try {
        const res = await fetch('/api/services');
        if (!res.ok) {
          throw new Error('Failed to fetch services');
        }
        const data: Service[] = await res.json();
        setServices(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchServices();
  }, []);

  return (
    <main>
      {services.map((service) => (
        <div key={service.id} className="p-4">
          <h2 className="text-2xl font-bold">{service.name}</h2>
          <p>{service.description}</p>
          {service.is_available ? (
            service.consultants.map((consultant) => (
              <div key={consultant.id}>
                <p>{consultant.name}</p>
                <a href={consultant.calendly_link} target="_blank" rel="noopener noreferrer">
                  Book with {consultant.name}
                </a>
              </div>
            ))
          ) : (
            <p className="text-red-500">This service is not available at this time.</p>
          )}
        </div>
      ))}
    </main>
  );
}
