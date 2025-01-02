import { NextApiRequest, NextApiResponse } from "next";
import { Pool } from "pg";

// Initialize PostgreSQL connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { method, query } = req;

    if (method === "GET") {
      const { id } = query;

      if (!id || Array.isArray(id)) {
        return res.status(400).json({ message: "Invalid service ID" });
      }

      const serviceQuery = `
        SELECT s.id, s.name, s.description, s.is_available,
               COALESCE(json_agg(json_build_object(
                 'id', c.id,
                 'name', c.name,
                 'email', c.email,
                 'calendly_link', c.calendly_link
               )) FILTER (WHERE c.id IS NOT NULL), '[]') AS consultants
        FROM services s
        LEFT JOIN consultants c ON s.id = c.service_id
        WHERE s.id = $1
        GROUP BY s.id;
      `;
      const { rows } = await pool.query(serviceQuery, [id]);
      if (rows.length === 0) {
        return res.status(404).json({ message: "Service not found" });
      }

      return res.status(200).json(rows[0]);
    } else {
      res.setHeader("Allow", ["GET"]);
      return res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    console.error("Error fetching service:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
