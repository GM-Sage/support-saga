// app/components/ConsultantList/ConsultantList.tsx

import React, { useEffect, useState } from 'react';
import { Consultant } from '../../../types/consulting'; // Adjust the import path as necessary

/**
 * ConsultantList Component
 * Displays a list of consultants with their specialized services.
 */
const ConsultantList: React.FC = () => {
  const [consultants, setConsultants] = useState<Consultant[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch consultants from the API
    fetch('/api/consultants/consultants')
      .then((response) => response.json())
      .then((data: Consultant[]) => {
        setConsultants(data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to fetch consultants.');
        setLoading(false);
        console.error(err);
      });
  }, []);

  if (loading) return <p>Loading consultants...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="consultant-list">
      <h2>Our Consultants</h2>
      {consultants.map((consultant) => (
        <div key={consultant.id} className="consultant-card">
          <h3>{consultant.name}</h3>
          <p>Email: {consultant.email}</p>
          {consultant.calendlyLink && (
            <p>
              Schedule: <a href={consultant.calendlyLink} target="_blank" rel="noopener noreferrer">{consultant.calendlyLink}</a>
            </p>
          )}
          <h4>Specializes in:</h4>
          <ul>
            {consultant.services.map((service) => (
              <li key={service.id}>{service.name}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ConsultantList;