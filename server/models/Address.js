const mongoose = require("mongoose");

// Define the schema for an address, which will be used to create a new Mongoose model
const addressSchema = new mongoose.Schema({
  // Reference to the user that this address belongs to, stored as an ObjectId
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model, which is defined elsewhere
    required: true,
  },
  // Street address, required
  street: {
    type: String,
    required: true,
  },
  // City, required
  city: {
    type: String,
    required: true,
  },

  // Area, required
  area: {
    type: String,
    required: true,
  },
  // State, required
  state: {
    type: String,
    required: true,
  },
  // Country, optional with default value of "India"
  country: {
    type: String,
    default: "India"
  },
  // ZIP code, required
  zipCode: {
    type: Number,
    required: true,
  },
});

// Export a new Mongoose model based on the address schema
module.exports = mongoose.model("Address", addressSchema);
