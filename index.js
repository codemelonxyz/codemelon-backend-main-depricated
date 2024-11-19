import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import serverAuth from './middlewares/server.auth.js';
import serverHealthRoutes from './routes/serverhealth.routes.js';
import authRoutes from './routes/auth.routes.js';

dotenv.config();

const port = process.env.PORT || 3000;
const app = express();

// Define allowed origins
const allowedOrigins = [
  'https://codemelon.xyz',
  'http://localhost:3000'
];

// CORS configuration
const corsOptions = {
  origin: true, // Allow all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: '*', // Allow all headers
  credentials: true,
  optionsSuccessStatus: 204
};

// Global Middlewares
app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.status(200).json({
    message: "Welcome to codemelon APIs",
    instruction: "Go to codemelon.xyz/developers for more"
  });
});

app.use('/api/v1', serverHealthRoutes);
app.use('/api/v1/auth', authRoutes);

// Apply serverAuth to protected routes if necessary
// app.use('/api/v1/protected', serverAuth, protectedRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});