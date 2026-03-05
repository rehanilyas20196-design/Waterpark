# ⚡ Quick Reference - Backend Setup

## 🚀 Get Started in 3 Minutes

### Terminal 1: Start Backend
```bash
cd waterpark/server
npm install
npm run dev
```
✓ Backend ready on http://localhost:5000

### Terminal 2: Start Frontend  
```bash
cd waterpark
npm run dev
```
✓ Frontend ready on http://localhost:5173

### Open Browser
```
http://localhost:5173
```

**Done!** 🎉

---

## 📖 Key Commands

| Command | What it does |
|---------|-------------|
| `npm install` | Install dependencies |
| `npm run dev` | Start development server |
| `npm start` | Start production server |
| `npm run build` | Build for production |
| `npm run lint` | Check for errors |

---

## 🎯 Test the Booking Flow

1. **Navigate** to http://localhost:5173/booking
2. **Fill form:**
   - Date: Any future date
   - Party: 2 people
   - Ticket: Full Day
   - Add-ons: Optional
   - Name: John Doe
   - Email: john@example.com
   - Phone: +1 555 123 4567
3. **Click** "Complete Booking"
4. **See** confirmation with Booking ID & Ticket ID
5. **Check** bookings at `/my-tickets`
6. **Search** with email: john@example.com

---

## 📂 Where Data is Stored

```
waterpark/
└── server/
    └── data/
        ├── bookings.json  👈 Your bookings
        └── tickets.json   👈 Your tickets
```

**View bookings:**
```bash
cat server/data/bookings.json
```

**Clear all data:**
```bash
echo "[]" > server/data/bookings.json
echo "[]" > server/data/tickets.json
```

---

## 🔗 API Endpoints Quick Test

```bash
# Health check
curl http://localhost:5000/api/health

# Create booking
curl -X POST http://localhost:5000/api/bookings \
  -H "Content-Type: application/json" \
  -d '{
    "date":"2024-03-20","partySize":2,"ticketType":"full-day",
    "addOns":[],"total":99.99,"firstName":"John","lastName":"Doe",
    "email":"john@test.com","phone":"+1555123456","paymentToken":"mock"
  }'

# Search bookings by email
curl http://localhost:5000/api/bookings/search/john@test.com
```

---

## ⚠️ Common Issues

| Issue | Fix |
|-------|-----|
| Port 5000 in use | Change: `PORT=5001 npm run dev` |
| Can't connect to backend | Check both servers are running |
| No data showing | Verify `server/data/` exists |
| CORS error | Backend CORS is enabled, check URL |
| Form won't submit | Check browser console for errors |

---

## 📚 Full Documentation

- **Setup Guide**: [BACKEND_SETUP.md](./BACKEND_SETUP.md)
- **Backend API**: [server/SETUP_GUIDE.md](./server/SETUP_GUIDE.md)
- **Summary**: [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md)

---

## ✨ What You Can Do Now

- ✅ Users can book tickets with full details
- ✅ Data persists in secure JSON files
- ✅ Users can search their bookings
- ✅ Download tickets as files
- ✅ Print confirmation receipts
- ✅ View booking history

---

That's it! Happy booking! 🎊
