const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');

const authRoutes = require('./routes/auth');
const listingRoutes = require('./routes/listing')
const bookingRoutes = require('./routes/booking')
const userRoutes = require('./routes/user')


app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Routes
app.use('/auth', authRoutes);
app.use('/properties', listingRoutes)
app.use('/bookings', bookingRoutes)
app.use('/users', userRoutes)

// Mongoose setup
const PORT = process.env.PORT || 3001;
mongoose.connect(process.env.MONGO_URI, {
  
  dbName: "homerent",
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
})
.catch((err) => {
  console.log(`Error: ${err}`);
});
