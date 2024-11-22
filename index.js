import express from "express";
import dotenv from "dotenv";
import cors from "cors";
// import serverAuth from './middlewares/server.auth.js';
import serverHealthRoutes from "./routes/serverhealth.routes.js";
import authRoutes from "./routes/auth.routes.js";
import waitlistRoutes from "./routes/waitlist.routes.js"; // Corrected import

dotenv.config();

const port = process.env.PORT || 8000;
const app = express();

// Global Middlewares
app.use(cors()); // Allow all origins, methods, and headers
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to codemelon APIs",
    instruction: "Go to codemelon.xyz/developers for more",
  });
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1", serverHealthRoutes);
app.use("/api/v1", waitlistRoutes); // Corrected usage

// Apply serverAuth to protected routes if necessary
// app.use('/api/v1/protected', serverAuth, protectedRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
