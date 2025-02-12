const mongoose = require("mongoose");

const ListingSchema = new mongoose.Schema (
  {
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    category: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    streetAddress: {
      type: String,
      required: true,
    },
    aptSuite: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    province: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    guestCount: {
      type: String,
      required: true,
    },
    bedroomCount: {
      type: String,
      required: true,
    },
    bedCount: {
      type: String,
      required: true,
    },
    bathroomCount: {
      type: String,
      required: true,
    },
    amenities: {
      type: String,
      default: [],
    },
    listingPhotoPaths: [{ type: String }],
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    highlight: {
      type: String,
      required: true,
    },
    highlightDetails: {
        type: String,
        required: true,
    },
    price: {
      type: String,
      required: true,
    },
    
  },
  { timestamps: true }
)

const Listing = mongoose.model( "Listing", ListingSchema )
module.exports = Listing;