import express from 'express';
import connectDB from './src/db/db.js';
import { ENV } from './src/utils/env.js';


import authRoutes from './src/routes/auth.routes.js'

const app = express();
const PORT = ENV.PORT || 2000;
app.use(express.json()); // Middleware to parse JSON bodies


// Routes
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
})