import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import serverAuth from './middlewares/server.auth.js';
import serverHealthRoutes from './routes/serverhealth.routes.js';
import authRoutes from './routes/auth.routes.js';

dotenv.config();

const port = process.env.PORT || 3000;
const app = express();

// Global Middlewares //
app.use(express.json());
app.use(cors());
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