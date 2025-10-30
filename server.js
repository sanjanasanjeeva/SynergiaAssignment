const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON body data
app.use(express.json());


// Temporary in-memory array for bookings
let bookings = [];
let currentId = 1;

// ✅ 1. GET /api/bookings - Get all bookings
app.get('/api/bookings', (req, res) => {
  res.json(bookings);
});

// ✅ 2. POST /api/bookings - Create a new booking
app.post('/api/bookings', (req, res) => {
  const { name, email, event } = req.body;

  if (!name || !email || !event) {
    return res.status(400).json({ message: 'Name, email, and event are required' });
  }

  const newBooking = {
    id: currentId++,
    name,
    email,
    event,
  };

  bookings.push(newBooking);
  res.status(201).json(newBooking);
});

// ✅ 3. GET /api/bookings/:id - Get booking by ID
app.get('/api/bookings/:id', (req, res) => {
  const booking = bookings.find(b => b.id === parseInt(req.params.id));
  if (!booking) {
    return res.status(404).json({ message: 'Booking not found' });
  }
  res.json(booking);
});

// ✅ 4. PUT /api/bookings/:id - Update booking details
app.put('/api/bookings/:id', (req, res) => {
  const booking = bookings.find(b => b.id === parseInt(req.params.id));
  if (!booking) {
    return res.status(404).json({ message: 'Booking not found' });
  }

  const { name, email, event } = req.body;

  if (name) booking.name = name;
  if (email) booking.email = email;
  if (event) booking.event = event;

  res.json(booking);
});

// ✅ 5. DELETE /api/bookings/:id - Cancel a booking
app.delete('/api/bookings/:id', (req, res) => {
  const bookingIndex = bookings.findIndex(b => b.id === parseInt(req.params.id));
  if (bookingIndex === -1) {
    return res.status(404).json({ message: 'Booking not found' });
  }

  bookings.splice(bookingIndex, 1);
  res.json({ message: 'Booking cancelled successfully' });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
