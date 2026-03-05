# 🎯 Complete Setup Guide - WaterPark with Backend

## Table of Contents
1. [Quick Start](#quick-start)
2. [Detailed Setup](#detailed-setup)
3. [Running the Project](#running-the-project)
4. [Features](#features)
5. [Troubleshooting](#troubleshooting)

## Quick Start

If you want to get up and running quickly:

### Terminal 1: Start Backend
```bash
cd waterpark/server
npm install
npm run dev
```

### Terminal 2: Start Frontend
```bash
cd waterpark
npm run dev
```

Visit: `http://localhost:5173`

---

## Detailed Setup

### System Requirements
- Node.js v14 or higher
- npm v6 or higher
- Windows/Mac/Linux

### Step 1: Install Frontend Dependencies

```bash
cd waterpark
npm install
```

Expected output:
```
added 250+ packages in ~2-3 minutes
```

### Step 2: Install Backend Dependencies

```bash
cd server
npm install
```

Expected output:
```
added 50+ packages in ~1-2 minutes
```

### Step 3: Configure Environment (Optional)

The frontend is already configured to use `http://localhost:5000/api` for the backend.

If you want to use a different port, edit `waterpark/.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

---

## Running the Project

### Option A: Two Terminal Windows (Recommended)

**Terminal 1 - Backend:**
```bash
cd waterpark/server
npm run dev
```

Expected output:
```
╔════════════════════════════════════════╗
║  WaterPark Backend Server              ║
║  Running on http://localhost:5000      ║
╚════════════════════════════════════════╝
```

**Terminal 2 - Frontend:**
```bash
cd waterpark
npm run dev
```

Expected output:
```
  VITE v5.0.0  ready in XXX ms
  ➜  Local:   http://localhost:5173/
```

### Option B: Package.json Scripts

Add this to `waterpark/package.json` to run both with one command:

```json
{
  "scripts": {
    "dev:full": "concurrently \"npm run dev\" \"cd server && npm run dev\""
  }
}
```

Then run:
```bash
npm run dev:full
```

(Requires `npm install -D concurrently`)

---

## Features

### 🎫 Booking System

1. **User Books a Ticket** (`/booking`)
   - Select date & party size
   - Choose ticket type
   - Add optional add-ons
   - Enter guest information
   - Review and confirm

2. **Backend Processes Booking**
   - Validates data
   - Generates booking ID
   - Generates ticket ID
   - Stores in file system
   - Returns confirmation

3. **User Receives Confirmation** (`/booking-confirmation`)
   - Shows booking ID
   - Displays ticket ID
   - Contains all booking details
   - Download receipt option

### 🎟️ Ticket Management

1. **View Your Tickets** (`/my-tickets`)
   - Search bookings by email
   - See all booking details
   - View ticket IDs
   - Download tickets as text files
   - Print tickets

2. **Ticket File** (`server/data/tickets.json`)
   - Stores all generated tickets
   - Searchable by email
   - Contains full booking info
   - Track usage status

### 💾 Data Storage

**Location:** `waterpark/server/data/`

**Files:**
- `bookings.json` - All booking records
- `tickets.json` - All ticket records

**Format:** JSON arrays for easy viewing and manipulation

**Backup:** Simply copy the `data/` folder

### 📊 Admin Features

Check all bookings:
```bash
curl http://localhost:5000/api/admin/bookings
```

The response will show all bookings with full details.

---

## Project Structure

```
waterpark/
├── src/
│   ├── pages/
│   │   ├── Booking.tsx            # Booking form page
│   │   ├── BookingConfirmation.tsx # Confirmation page
│   │   └── MyTickets.tsx           # Ticket search & view
│   ├── components/
│   │   └── BookingForm.tsx         # Multi-step booking form
│   ├── hooks/
│   │   └── useBookingAPI.ts        # API calls hook
│   ├── store/
│   │   └── bookingStore.ts         # Zustand state management
│   └── App.tsx                     # Routes setup
├── .env                            # Frontend environment
├── vite.config.ts                  # Vite configuration
└── package.json
│
└── server/
    ├── server.js                   # Express server
    ├── data/
    │   ├── bookings.json           # Stored bookings
    │   └── tickets.json            # Stored tickets
    ├── SETUP_GUIDE.md              # Backend setup
    └── package.json
```

---

## API Integration

### How Frontend Calls Backend

**Location:** `src/hooks/useBookingAPI.ts`

**Methods:**
- `submitBooking(bookingData)` - Create new booking
- `getTicket(ticketId)` - Fetch single ticket
- `getBooking(bookingId)` - Fetch booking details
- `searchBookings(email)` - Search by email

### Data Flow

```
User fills form
    ↓
BookingForm.tsx collects data
    ↓
useBookingAPI.submitBooking()
    ↓
POST /api/bookings (Backend)
    ↓
Server validates & generates IDs
    ↓
Saves to bookings.json & tickets.json
    ↓
Returns booking & ticket info
    ↓
Frontend stores in Zustand store
    ↓
Redirects to /booking-confirmation
    ↓
Display confirmation with ticket ID
```

---

## Workflow Examples

### Example 1: Complete a Booking

1. Navigate to http://localhost:5173/booking
2. Select date: March 15, 2024
3. Select party size: 4 people
4. Select ticket type: Full Day
5. Add-ons: Locker + Food Package
6. Enter guest info:
   - First Name: John
   - Last Name: Doe
   - Email: john@example.com
   - Phone: +1 (555) 123-4567
7. Click "Complete Booking"
8. See confirmation with Booking ID and Ticket ID

### Example 2: View Existing Bookings

1. Navigate to http://localhost:5173/my-tickets
2. Enter email: john@example.com
3. Click Search
4. View all bookings for that email
5. Download or print ticket

### Example 3: Check Backend Data

```bash
# View all bookings (formatted)
node -e "console.log(JSON.stringify(require('./server/data/bookings.json'), null, 2))"

# View specific booking
grep "john@example.com" server/data/bookings.json
```

---

## Troubleshooting

### Issue: Frontend can't connect to backend

**Symptoms:** 
- Booking fails with network error
- Console shows CORS or connection errors

**Solution:**
1. Check backend is running: `npm run dev` in server folder
2. Check port 5000 is not blocked
3. Verify `.env` has correct `VITE_API_URL`
4. Clear browser cache and reload

### Issue: Bookings not saving

**Symptoms:**
- Booking succeeds but data missing next day

**Solution:**
1. Check `server/data/` directory exists
2. Verify file permissions:
   ```bash
   chmod 755 server/data
   chmod 644 server/data/*.json
   ```
3. Check console for file write errors

### Issue: Old bookings showing

**Symptoms:**
- Test bookings from before still appearing

**Solution:**
```bash
# Clear data (WARNING: Deletes all bookings)
echo "[]" > server/data/bookings.json
echo "[]" > server/data/tickets.json
```

### Issue: Port already in use

**Symptoms:**
- Error: "Port 5000 already in use" or "Port 5173 already in use"

**Solution:**
Change port in `.env` or start command:
```bash
# Backend on different port
PORT=5001 npm run dev

# Frontend on different port  
npm run dev -- --port 5174
```

### Issue: Dependencies not installing

**Symptoms:**
- `npm install` fails or hangs

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Delete lock file
rm package-lock.json

# Reinstall
npm install
```

---

## Performance Tips

1. **Backend Performance**
   - Data files stay small with file-based storage
   - For 10,000+ bookings, consider a database
   - Add pagination to API endpoints

2. **Frontend Performance**
   - Already optimized with Vite
   - Components use lazy loading
   - Tailwind CSS is production-ready

3. **Deployment**
   - Backend: Host on Heroku, Railway, or VPS
   - Frontend: Deploy to Vercel, Netlify, or GitHub Pages
   - Update `VITE_API_URL` for production

---

## Security Notes

### Current Implementation
- ✅ CORS enabled for development
- ✅ Input validation on backend
- ✅ File-based storage (no SQL injection risk)

### For Production
- ⚠️ Implement authentication
- ⚠️ Add rate limiting
- ⚠️ Use HTTPS only
- ⚠️ Validate all inputs
- ⚠️ Hash sensitive data
- ⚠️ Use proper payment integration
- ⚠️ Add logging and monitoring

---

## Next Steps

1. ✅ Backend running on port 5000
2. ✅ Frontend running on port 5173
3. ✅ Make a test booking
4. ✅ Search for your ticket
5. ✅ Download/print ticket
6. ✅ Check `server/data/bookings.json`

---

## Additional Resources

- [Backend Setup Guide](./server/SETUP_GUIDE.md)
- [Main README](./README.md)
- [Quick Start Guide](./QUICK_START.md)

---

**Need help?** Check the console for error messages and verify both servers are running!
