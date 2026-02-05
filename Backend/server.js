import express from 'express';
import dotenv from 'dotenv';
import connectDB from './src/db/db';
dotenv.config();


import authRoutes from './src/routes/auth.routes.js'

const app = express();
const PORT = process.env.PORT || 2000;
app.use(express.json()); // Middleware to parse JSON bodies


// Routes
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
})