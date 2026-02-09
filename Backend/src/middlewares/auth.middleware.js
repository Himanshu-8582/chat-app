import User from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import jwt from 'jsonwebtoken';
import { ENV } from "../utils/env.js";
import ApiResponse from "../utils/ApiResponse.js";

export const protectedRoute = asyncHandler(async (req, res, next) => {
    const token = req.cookies.jwt;
    if (!token) return res.status(401).json(new ApiResponse(401, "Unauthorized: No token provided"));
    const decoded = jwt.verify(token, ENV.JWT_SECRET);
    if(!decoded) return res.status(401).json(new ApiResponse(401, "Unauthorized: Invalid token"));
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) return res.status(401).json(new ApiResponse(401, "Unauthorized: User not found"));
    req.user = user; // Attach user to request object
    next();
})