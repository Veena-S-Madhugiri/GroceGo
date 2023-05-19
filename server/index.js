// DB Connection
const connectToMongo = require('./db')
connectToMongo()

// Import 
const express =  require('express');
const app = express();
require('dotenv').config();
const bodyParser = require("body-parser");
const cors = require('cors')
app.use(bodyParser.json());


app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();

  
});

// Middleware
app.use(express.json());

app.get('/', (req, res) =>{
  res.send('Welcome')
})

// Routes
app.use('/api', require('./routes/authentication'))
app.use('/api', require('./routes/address'))
app.use('/api', require('./routes/products'))
app.use('/api', require('./routes/payments'))
app.use('/api/orders', require('./routes/orders'))

// Listening to port
const port = process.env.PORT || 8000
app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})
