import express from 'express';
import connectDB from './src/db/db.js';
import { ENV } from './src/utils/env.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { errorHandler } from './src/utils/errorHandler.js';

import authRoutes from './src/routes/auth.routes.js'
import messageRoutes from './src/routes/message.route.js'

const app = express();
const PORT = ENV.PORT || 2000;

app.use(
  cors({
    origin: ENV.CLIENT_URL,
    credentials: true,
  }),
);

app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ limit: "20mb", extended: true }));
app.use(cookieParser());


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
})