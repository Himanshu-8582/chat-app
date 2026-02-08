import express from 'express';
import connectDB from './src/db/db.js';
import { ENV } from './src/utils/env.js';
import cookieParser from 'cookie-parser';


import authRoutes from './src/routes/auth.routes.js'
import messageRoutes from './src/routes/message.route.js'

const app = express();
const PORT = ENV.PORT || 2000;
app.use(express.json()); // Middleware to parse JSON bodies
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
})