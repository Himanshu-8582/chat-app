import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import { ENV } from '../utils/env.js';


export const socketAuthMiddleware = async (socket,next) => {
    try {
        const token = socket.handshake.headers.cookie?.split("; ").find((row) => row.startsWith("jwt="))?.split("=")[1]; 
        if (!token) {
            console.log("Socket connection rejected: No token provided");
            return next(new Error("Unauthorized- No Token Provided"));
        }

        const decode = jwt.verify(token, ENV.JWT_SECRET);
        if (!decode) {
            console.log("Socket connection rejected: Invalid Token");
            return next(new Error("Unauthorized- Invalid Token"));
        }

        const user = await User.findById(decode.userId).select('-password');
        if (!user) {
            console.log("Socket connection rejected: User not found");
            return next(new Error("User not found"));
        }

        // attach user info to socket
        socket.user = user;
        socket.userId = user._id.toString();

        console.log(`Socket authenticated for user: ${user.fullName} (${user._id})`);

        next();
    } catch (error) {
        console.log("Error in socket authentication:", error.message);
        return next(new Error("Unauthorized- Authentication failed"));
    }
}