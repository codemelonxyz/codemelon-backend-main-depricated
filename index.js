import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import serverAuth from './middlewares/server.auth.js';
import serverHealthRoutes from './routes/serverhealth.routes.js';
import authRoutes from './routes/auth.routes.js';

dotenv.config();

const port = process.env.PORT || 3000;
const app = express();

const allowedOrigins = [
  'https://codemelon.xyz',
  'http://localhost:3000'
];

// Function to check if the origin is allowed
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (
      allowedOrigins.includes(origin) ||
      /\.codemelon\.xyz$/.test(origin)
    ) {
      callback(null, true);
    } else {
      callback(new Error('CORS policy: Origin not allowed'), false);
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
  optionsSuccessStatus: 204
};

// Global Middlewares //
// Configure CORS with the defined options
app.use(cors(corsOptions));

// Global Middlewares //
app.use(express.json());
app.use(serverAuth);

app.get('/', (req, res) => {
    res.status(200).json({
        message: "Welcome to codemelon apis",
        instruction: "Go to codemelon.xyz/developers for more"
    })
});

app.use('/api/v1', serverHealthRoutes);
app.use('/api/v1/auth', authRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});