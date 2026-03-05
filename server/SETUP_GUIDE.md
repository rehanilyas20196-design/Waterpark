# 🚀 WaterPark Backend Setup Guide

## Overview

The WaterPark backend is a Node.js/Express server that handles:
- 📝 Booking submissions
- 💾 File-based booking storage
- 🎟️ Ticket generation and retrieval
- 🔍 Booking search functionality

## Prerequisites

- Node.js (v14+)
- npm

## Installation

### 1. Navigate to the server directory
```bash
cd waterpark/server
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start the backend server

**Development mode** (with auto-reload):
```bash
npm run dev
```

**Production mode**:
```bash
npm start
```

The server will start on `http://localhost:5000`

You should see:
```
╔════════════════════════════════════════╗
║  WaterPark Backend Server              ║
║  Running on http://localhost:5000      ║
╚════════════════════════════════════════╝
```

## API Endpoints

### Health Check
```
GET /api/health
```

### Create Booking
```
POST /api/bookings
Content-Type: application/json

{
  "date": "2024-03-15",
  "partySize": 4,
  "ticketType": "full-day",
  "addOns": ["locker", "parking"],
  "total": 199.99,
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone": "+1 (555) 123-4567",
  "paymentToken": "mock-payment-token"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Booking confirmed successfully",
  "booking": {
    "id": "ABC12345",
    "bookingId": "ABC12345",
    "ticketId": "TICKET-XYZ789ABC",
    "status": "confirmed",
    ...
  },
  "ticket": {
    "id": "TICKET-XYZ789ABC",
    "bookingId": "ABC12345"
  }
}
```

### Get Ticket
```
GET /api/tickets/:ticketId
```

### Get Booking
```
GET /api/bookings/:bookingId
```

### Search Bookings by Email
```
GET /api/bookings/search/:email
```

### Get All Bookings (Admin)
```
GET /api/admin/bookings
```

## File Storage

Bookings and tickets are stored in JSON files located in:
```
server/data/
├── bookings.json
└── tickets.json
```

Each file contains an array of records:

**bookings.json example:**
```json
[
  {
    "id": "ABC12345",
    "date": "2024-03-01T10:30:00.000Z",
    "visitDate": "2024-03-15",
    "partySize": 4,
    "ticketType": "full-day",
    "addOns": ["locker", "parking"],
    "total": 199.99,
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "+1 (555) 123-4567",
    "ticketId": "TICKET-XYZ789ABC",
    "paymentStatus": "completed",
    "status": "confirmed"
  }
]
```

## Environment Variables

The server uses environment variables from the `.env` file in the `server/` directory:

```env
PORT=5000
```

You can modify the `PORT` variable if needed.

## Testing the API

### Using curl

```bash
# Health check
curl http://localhost:5000/api/health

# Create a booking
curl -X POST http://localhost:5000/api/bookings \
  -H "Content-Type: application/json" \
  -d '{
    "date": "2024-03-15",
    "partySize": 2,
    "ticketType": "full-day",
    "addOns": [],
    "total": 99.99,
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "+1 (555) 123-4567",
    "paymentToken": "mock-token"
  }'

# Search bookings
curl http://localhost:5000/api/bookings/search/john@example.com
```

### Using Postman

1. Import the request URLs above
2. Set method to POST for booking creation
3. Add request body as JSON
4. Click Send

## Features

### ✅ File-Based Storage
- No database required
- All data stored in JSON files
- Easily backup by copying files
- Human-readable format

### ✅ Booking Management
- Create bookings with full details
- Track payment status
- Store guest information
- Generate unique booking IDs

### ✅ Ticket Generation
- Automatic ticket ID generation
- Linked to bookings
- Searchable by email
- Download support in frontend

### ✅ Error Handling
- Comprehensive error messages
- Request validation
- File operation error handling
- Status codes and messages

## Troubleshooting

### Server won't start
- Check if port 5000 is already in use
- Try running on a different port: `PORT=5001 npm start`

### Bookings not saving
- Ensure the `server/data/` directory exists
- Check file permissions on the data directory
- Look for error messages in the console

### CORS errors
- The backend has CORS enabled for all origins
- If you get CORS errors, check your frontend API URL in `.env`

## Production Deployment

For production, consider:
1. Using a real database (MongoDB, PostgreSQL)
2. Implementing real payment processing (Stripe, PayPal)
3. Adding authentication and authorization
4. Setting up SSL/TLS
5. Using environment-based configuration
6. Implementing request rate limiting
7. Adding logging and monitoring

## Next Steps

1. ✅ Start the backend: `npm run dev`
2. ✅ Start the frontend: `npm run dev` (in waterpark directory)
3. ✅ Visit http://localhost:5173
4. ✅ Make a test booking
5. ✅ Check `server/data/bookings.json` to see stored data

---

For more information, see the main README in the root directory.
