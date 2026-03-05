import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';
dotenv.config();

const pool = new Pool({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || 'waterpark_db',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'pak@2233',
});

async function test() {
    const email = 'rehanilyas20196@gmail.com';
    const query = `
    SELECT 
      b.id, 
      b.visit_date as "visitDate", 
      b.party_size as "partySize", 
      tt.name as "ticketType", 
      b.total, 
      b.first_name as "firstName", 
      b.last_name as "lastName", 
      b.email, 
      b.phone, 
      b.status, 
      b.created_at as "date",
      t.id as "ticketId",
      COALESCE(
        (SELECT JSON_AGG(a.name) 
         FROM booking_add_ons ba 
         JOIN add_ons a ON ba.add_on_id = a.id 
         WHERE ba.booking_id = b.id),
        '[]'::json
      ) as "addOns"
    FROM bookings b
    LEFT JOIN tickets t ON b.id = t.booking_id
    LEFT JOIN ticket_types tt ON b.ticket_type_id = tt.id
    WHERE LOWER(b.email) = LOWER($1)
    ORDER BY b.created_at DESC
  `;
    try {
        const result = await pool.query(query, [email]);
        console.log('Result length:', result.rows.length);
        console.log('Results:', JSON.stringify(result.rows));
    } catch (err) {
        console.error('Error:', err.message);
    } finally {
        await pool.end();
    }
}

test();
