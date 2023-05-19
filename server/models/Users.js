// Importing the mongoose library
const mongoose = require('mongoose');

// Extracting the Schema class from the mongoose object
const { Schema } = mongoose;

// Defining the schema for the User collection
const userSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: Number, required: true },
    date: { type: Date, default: Date.now },
})

// Exporting the User model, which will be used to interact with the User collection in the database
module.exports = mongoose.model('User', userSchema)
