import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Attractions from './pages/Attractions';
import Booking from './pages/Booking';
import Payment from './pages/Payment';
import BookingConfirmation from './pages/BookingConfirmation';
import MyTickets from './pages/MyTickets';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ParkDetails from './pages/ParkDetails';
import AttractionDetail from './pages/AttractionDetail';
import './App.css';

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/park-details" element={<ParkDetails />} />
          <Route path="/attraction/:id" element={<AttractionDetail />} />
          <Route path="/attractions" element={<Attractions />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/booking-confirmation" element={<BookingConfirmation />} />
          <Route path="/my-tickets" element={<MyTickets />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
