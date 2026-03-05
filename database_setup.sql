-- WaterPark Database Schema for PostgreSQL

-- Create database
CREATE DATABASE waterpark_db;
\c waterpark_db;

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Attractions table
CREATE TABLE attractions (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(50) NOT NULL CHECK (category IN ('water-slide', 'wave-pool', 'lazy-river', 'splash-pad', 'show')),
    description TEXT NOT NULL,
    min_height VARCHAR(20),
    min_age INTEGER,
    intensity VARCHAR(20) NOT NULL CHECK (intensity IN ('kids', 'family', 'thrilling')),
    image VARCHAR(500),
    duration VARCHAR(50),
    capacity INTEGER,
    location VARCHAR(255),
    annual_visitors VARCHAR(100),
    water_type VARCHAR(255),
    history TEXT,
    condition VARCHAR(255),
    video_url VARCHAR(500)
);

-- Ticket types table
CREATE TABLE ticket_types (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    duration VARCHAR(100) NOT NULL,
    description TEXT
);

-- Add-ons table
CREATE TABLE add_ons (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    description TEXT,
    icon VARCHAR(10)
);

-- Bookings table
CREATE TABLE bookings (
    id VARCHAR(20) PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    visit_date DATE NOT NULL,
    party_size INTEGER NOT NULL,
    ticket_type_id VARCHAR(50) REFERENCES ticket_types(id),
    total DECIMAL(10,2) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    payment_status VARCHAR(20) DEFAULT 'pending' CHECK (payment_status IN ('pending', 'completed', 'failed', 'refunded')),
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Booking add-ons junction table
CREATE TABLE booking_add_ons (
    booking_id VARCHAR(20) REFERENCES bookings(id) ON DELETE CASCADE,
    add_on_id VARCHAR(50) REFERENCES add_ons(id) ON DELETE CASCADE,
    PRIMARY KEY (booking_id, add_on_id)
);

-- Tickets table
CREATE TABLE tickets (
    id VARCHAR(50) PRIMARY KEY,
    booking_id VARCHAR(20) REFERENCES bookings(id) ON DELETE CASCADE,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    visit_date DATE NOT NULL,
    party_size INTEGER NOT NULL,
    ticket_type_id VARCHAR(50) REFERENCES ticket_types(id),
    total DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    used BOOLEAN DEFAULT FALSE,
    qr_code VARCHAR(255)
);

-- Indexes for performance
CREATE INDEX idx_bookings_email ON bookings(email);
CREATE INDEX idx_bookings_visit_date ON bookings(visit_date);
CREATE INDEX idx_tickets_ticket_id ON tickets(id);
CREATE INDEX idx_users_email ON users(email);

-- Insert static data for attractions
INSERT INTO attractions (id, name, category, description, min_height, min_age, intensity, image, duration, capacity, location, annual_visitors, water_type, history, condition, video_url) VALUES
('tornado-rush', 'Tornado Rush', 'water-slide', 'A thrilling 5-floor water slide with tight turns and splash landing.', '4''6"', NULL, 'thrilling', '/images/Atlantis_Aquaventure_Trident_Tower_waterslides.jpg', '3 minutes', 50, 'Thrill Zone - North Section', '180,000+ visitors per year', 'Chlorinated fresh water, 82°F', 'Opened in 2015, Tornado Rush has been our signature attraction. Built with German engineering and safety standards, it features the steepest descent in the region.', 'Fully operational & well-maintained', 'https://www.youtube.com/embed/dQw4w9WgXcQ'),
('wave-master', 'Wave Master', 'wave-pool', 'Experience artificial waves up to 6 feet tall in our massive wave pool.', NULL, 5, 'family', '/images/18b2638a.webp', 'Wave cycles every 10 minutes', 200, 'Family Zone - Central Area', '250,000+ visitors per year', 'Chlorinated fresh water, 78°F', 'Our flagship wave pool opened in 2010 and has been a family favorite ever since.', 'Fully operational', NULL);

-- Insert ticket types
INSERT INTO ticket_types (id, name, price, duration, description) VALUES
('day-pass', 'Day Pass', 45.00, 'Full day access', 'Complete access to all attractions during operating hours'),
('evening-pass', 'Evening Pass', 30.00, '4 PM onwards', 'Access from 4 PM until park closure'),
('annual-pass', 'Annual Pass', 199.00, '12 months', 'Unlimited visits for one full year');

-- Insert add-ons
INSERT INTO add_ons (id, name, price, description, icon) VALUES
('locker', 'Locker Rental', 10.00, 'Secure locker for your belongings', '🔒'),
('food-voucher', 'Food Voucher', 15.00, 'Prepaid voucher for food and beverages', '🍔'),
('towel', 'Towel Rental', 5.00, 'Clean towel rental', '🧽'),
('photo-package', 'Photo Package', 20.00, 'Professional photos from your visit', '📸');

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON bookings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();