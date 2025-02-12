const router = require('express').Router();

const Booking = require('../models/Booking');

// create a booking

router.post("/create", async (req, res) => {
  try {
    const {customerId, hostId, listingId, startDate, endDate, totalPrice} = req.body;
    const newBooking = new Booking({
      customerId,
      hostId,
      listingId,
      startDate,
      endDate,
      totalPrice,
    });
    await newBooking.save();
    res.status(200).json(newBooking);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Booking failed", error: err.message });

  }
})

module.exports = router;