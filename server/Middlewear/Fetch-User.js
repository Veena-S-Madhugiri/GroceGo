// Importing the jsonwebtoken library
const jwt = require('jsonwebtoken');
// Importing the dotenv library to load environment variables from .env file
require('dotenv').config();

// Defining a middleware function to verify the JWT token
const verifyToken = (req, res, next) =>{
    // Get the JWT token from the request headers
    const token = req.header('authentication-token');
    // If the token is not present, return an error response
    if (!token) {
        return res.status(401).json({ error: "Please authenticate using a valid token" })
    }
    try {
        // Verify the JWT token using the secret key defined in .env file
        const data = jwt.verify(token, process.env.JWT_SECRET_KEY);
        // Add the decoded user data to the request object
        req.user =  data.user;
        // Call the next middleware function
        next();
    } catch (error) {
        // If there's an error in decoding the JWT token, return an error response
        return res.status(401).json({ error: "Please authenticate using a valid token" })
    }
}

// Export the verifyToken middleware function for use in other files
module.exports = verifyToken;

