import { NextApiRequest, NextApiResponse } from 'next';
import { Pool } from 'pg';

// Initialize PostgreSQL connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { method } = req;

    if (method === 'GET') {
      // Fetch all services and consultants
      const servicesQuery = `
        SELECT s.id, s.name, s.description, s.is_available,
               COALESCE(json_agg(json_build_object(
                 'id', c.id,
                 'name', c.name,
                 'email', c.email,
                 'calendly_link', c.calendly_link
               )) FILTER (WHERE c.id IS NOT NULL), '[]') AS consultants
        FROM services s
        LEFT JOIN consultants c ON s.id = c.service_id
        GROUP BY s.id;
      `;
      const { rows } = await pool.query(servicesQuery);
      return res.status(200).json(rows);
    } else {
      res.setHeader('Allow', ['GET']);
      return res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    console.error('Error fetching services:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
