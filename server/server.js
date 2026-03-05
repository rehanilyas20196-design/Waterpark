import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Database connection
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'waterpark_db',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '',
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Authentication Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ success: false, message: 'Access denied. No token provided.' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ success: false, message: 'Invalid or expired token.' });
  }
};

// Database helper functions
async function createBooking(bookingData) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // Insert booking
    const bookingQuery = `
      INSERT INTO bookings (id, user_id, visit_date, party_size, ticket_type_id, total, first_name, last_name, email, phone, payment_status, status)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      RETURNING 
        id, 
        visit_date as "visitDate", 
        party_size as "partySize", 
        ticket_type_id as "ticketType", 
        total, 
        first_name as "firstName", 
        last_name as "lastName", 
        email, 
        phone, 
        payment_status as "paymentStatus", 
        status,
        created_at as "date"
    `;
    const bookingValues = [
      bookingData.id,
      bookingData.userId,
      bookingData.visitDate,
      bookingData.partySize,
      bookingData.ticketType,
      bookingData.total,
      bookingData.firstName,
      bookingData.lastName,
      bookingData.email,
      bookingData.phone,
      bookingData.paymentStatus,
      bookingData.status
    ];
    const bookingResult = await client.query(bookingQuery, bookingValues);

    // Insert booking add-ons if any
    if (bookingData.addOns && bookingData.addOns.length > 0) {
      const addOnQuery = 'INSERT INTO booking_add_ons (booking_id, add_on_id) VALUES ($1, $2)';
      for (const addOnId of bookingData.addOns) {
        await client.query(addOnQuery, [bookingData.id, addOnId]);
      }
    }

    // Insert ticket
    const ticketQuery = `
      INSERT INTO tickets (id, booking_id, first_name, last_name, email, visit_date, party_size, ticket_type_id, total)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *
    `;
    const ticketValues = [
      bookingData.ticketId,
      bookingData.id,
      bookingData.firstName,
      bookingData.lastName,
      bookingData.email,
      bookingData.visitDate,
      bookingData.partySize,
      bookingData.ticketType,
      bookingData.total
    ];
    const ticketResult = await client.query(ticketQuery, ticketValues);

    await client.query('COMMIT');
    return { booking: bookingResult.rows[0], ticket: ticketResult.rows[0] };
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

async function getBookingById(bookingId) {
  const query = 'SELECT * FROM bookings WHERE id = $1';
  const result = await pool.query(query, [bookingId]);
  return result.rows[0];
}

async function getTicketById(ticketId) {
  const query = 'SELECT * FROM tickets WHERE id = $1';
  const result = await pool.query(query, [ticketId]);
  return result.rows[0];
}

async function cancelBookingById(bookingId) {
  const query = 'UPDATE bookings SET status = $1 WHERE id = $2 RETURNING *';
  const result = await pool.query(query, ['cancelled', bookingId]);
  return result.rows[0];
}

async function getBookingsByEmail(email, userId = null) {
  let query = `
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
  `;

  const params = [email];

  if (userId) {
    query += ` AND b.user_id = $2`;
    params.push(userId);
  }

  query += ` ORDER BY b.created_at DESC`;

  const result = await pool.query(query, params);
  return result.rows;
}

async function getAllBookings() {
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
    ORDER BY b.created_at DESC
  `;
  const result = await pool.query(query);
  return result.rows;
}

// Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

// Create booking and process payment (Optionally authenticated)
app.post('/api/bookings', async (req, res) => {
  // Try to get user from token if provided
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  let userId = null;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');
      userId = decoded.id;
    } catch (e) {
      // Token invalid - proceed as guest
    }
  }
  try {
    const {
      date,
      partySize,
      ticketType,
      addOns,
      total,
      firstName,
      lastName,
      email,
      phone,
      paymentToken,
    } = req.body;

    // Validate required fields
    if (!date || !firstName || !lastName || !email || !phone || !ticketType) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields',
      });
    }

    const existingBookings = await getBookingsByEmail(email, userId);
    const activeBooking = existingBookings.find(b => b.status === 'confirmed');
    if (activeBooking) {
      return res.status(400).json({
        success: false,
        message: 'You are already booked. Please cancel your existing booking first.',
      });
    }

    // Generate booking ID and ticket ID
    const bookingId = uuidv4().substring(0, 8).toUpperCase();
    const ticketId = `TICKET-${uuidv4().substring(0, 12).toUpperCase()}`;

    // Create booking data
    const bookingData = {
      id: bookingId,
      userId: userId,
      visitDate: date,
      partySize,
      ticketType,
      addOns: addOns || [],
      total,
      firstName,
      lastName,
      email,
      phone,
      ticketId,
      paymentStatus: 'completed', // In production, verify payment
      status: 'confirmed',
    };

    // Save to database
    const { booking, ticket } = await createBooking(bookingData);

    res.status(201).json({
      success: true,
      message: 'Booking confirmed successfully',
      booking,
      ticket: {
        id: ticketId,
        bookingId,
      },
    });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating booking',
      error: error.message,
    });
  }
});

// Get ticket by ticket ID
app.get('/api/tickets/:ticketId', async (req, res) => {
  try {
    const { ticketId } = req.params;
    const ticket = await getTicketById(ticketId);

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: 'Ticket not found',
      });
    }

    res.json({
      success: true,
      ticket,
    });
  } catch (error) {
    console.error('Error fetching ticket:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching ticket',
      error: error.message,
    });
  }
});

// Get booking by booking ID
app.get('/api/bookings/:bookingId', async (req, res) => {
  try {
    const { bookingId } = req.params;
    const booking = await getBookingById(bookingId);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found',
      });
    }

    res.json({
      success: true,
      booking,
    });
  } catch (error) {
    console.error('Error fetching booking:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching booking',
      error: error.message,
    });
  }
});

// Cancel a booking
app.post('/api/bookings/:bookingId/cancel', async (req, res) => {
  try {
    const { bookingId } = req.params;
    const booking = await getBookingById(bookingId);

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    await cancelBookingById(bookingId);

    res.json({ success: true, message: 'Booking cancelled successfully' });
  } catch (error) {
    console.error('Error cancelling booking:', error);
    res.status(500).json({ success: false, message: 'Error cancelling booking', error: error.message });
  }
});

// Get all bookings (for admin)
app.get('/api/admin/bookings', async (req, res) => {
  try {
    const bookings = await getAllBookings();
    res.json({
      success: true,
      count: bookings.length,
      bookings,
    });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching bookings',
      error: error.message,
    });
  }
});

// Search bookings by email (Requires Authentication)
app.get('/api/bookings/search/:email', authenticateToken, async (req, res) => {
  try {
    const { email } = req.params;
    // Only return bookings that belong to the logged-in user
    const bookings = await getBookingsByEmail(email, req.user.id);

    if (bookings.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No bookings found for this email',
      });
    }

    res.json({
      success: true,
      count: bookings.length,
      bookings,
    });
  } catch (error) {
    console.error('Error searching bookings:', error);
    res.status(500).json({
      success: false,
      message: 'Error searching bookings',
      error: error.message,
    });
  }
});

// Authentication Routes

// Signup
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { firstName, lastName, email, phone, password } = req.body;

    // Validate
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    // Check if user exists
    const userCheck = await pool.query('SELECT * FROM users WHERE LOWER(email) = LOWER($1)', [email]);
    if (userCheck.rows.length > 0) {
      return res.status(400).json({ success: false, message: 'User already exists with this email' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Insert user
    const newUser = await pool.query(
      'INSERT INTO users (first_name, last_name, email, phone, password_hash) VALUES ($1, $2, $3, $4, $5) RETURNING id, first_name as "firstName", last_name as "lastName", email, phone',
      [firstName, lastName, email, phone, passwordHash]
    );

    const user = newUser.rows[0];

    // Generate token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'your_jwt_secret', { expiresIn: '7d' });

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user,
      token
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ success: false, message: 'Error during signup', error: error.message });
  }
});

// Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Missing email or password' });
    }

    // Find user
    const result = await pool.query(
      'SELECT id, first_name as "firstName", last_name as "lastName", email, phone, password_hash FROM users WHERE LOWER(email) = LOWER($1)',
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const user = result.rows[0];

    // Check password
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Generate token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'your_jwt_secret', { expiresIn: '7d' });

    // Remove password hash from response
    delete user.password_hash;

    res.json({
      success: true,
      message: 'Logged in successfully',
      user,
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Error during login', error: error.message });
  }
});

// Test database connection
pool.on('connect', () => {
  console.log('Connected to PostgreSQL database');
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

// Initialize database connection
async function initializeDatabase() {
  try {
    await pool.query('SELECT NOW()');
    console.log('Database connection established');
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
  }
}

// Start server
app.listen(PORT, async () => {
  await initializeDatabase();
  console.log(`
╔════════════════════════════════════════╗
║  WaterPark Backend Server              ║
║  Running on http://localhost:${PORT}    ║
║  Database: PostgreSQL                  ║
╚════════════════════════════════════════╝
  `);
});
