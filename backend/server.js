import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

// import routes
import authRoutes from './routes/auth.js';
import pollRoutes from './routes/pollRoutes.js';

dotenv.config();
const app = express();

// middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());

// routes
app.use('/api/auth', authRoutes);
app.use('/api/polls', pollRoutes);

// connect DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.error("MongoDB connection error", err));

// start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
