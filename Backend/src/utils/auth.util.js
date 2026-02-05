import jwt from "jsonwebtoken";
import ApiError from "./ApiError";

export const generateToken = (userId, res) => {

    const { JWT_SECRET } = process.env;
    if (!JWT_SECRET) {
        throw new ApiError(500, "JWT_SECRET is not defined in environment variables");
    }
    const token = jwt.sign({ userId }, JWT_SECRET, {
        expiresIn: '7d',
    });
    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      httpOnly: true,        // prevent XSS attacks: cross-site scripting
      sameSite: "strict",    // CSRF attack prevention
      secure: process.env.NODE_ENV === "development" ? false : true, // set to true in production
    });
    return token;
}