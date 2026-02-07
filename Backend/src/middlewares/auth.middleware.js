import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import { ENV } from "../utils/env.js";

export const protectedRoute = asyncHandler(async (req, res, next) => {
    const token = req.cookies.jwt;
    if (!token) throw new ApiError(401, "Unauthorized: No token provided");
    const decoded = jwt.verify(token, ENV.JWT_SECRET);
    if(!decoded) throw new ApiError(401, "Unauthorized: Invalid token");
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) throw new ApiError(401, "Unauthorized: User not found");
    req.user = user; // Attach user to request object
    next();
})