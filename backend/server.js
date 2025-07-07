const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv'); // To load .env file locally
const cors = require('cors'); // Import cors

// Load environment variables from .env file
dotenv.config();

const app = express();

// Enable CORS for all origins by default, or specific origins
// For production, it's safer to specify allowed origins.
// We'll update the 'origin' later with the Vercel frontend URL.
const allowedOrigins = [
  'http://localhost:5173', // For local development of frontend
  // Add your deployed frontend URL here after it's deployed
  // e.g., 'https://voting-app-frontend.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true // if your frontend sends cookies/tokens (like JWT in http-only cookies)
}));

app.use(express.json()); // Body parser middleware

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Define routes (example)
app.use('/api/auth', require('./routes/authRoutes')); // Assuming you have auth routes
app.use('/api/polls', require('./routes/pollRoutes')); // Assuming you have poll routes

// Basic route for testing
app.get('/', (req, res) => {
  res.send('Voting App Backend is running!');
});

const PORT = process.env.PORT || 5001; // Use process.env.PORT or default to 5001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});