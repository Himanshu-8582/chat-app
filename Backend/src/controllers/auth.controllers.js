import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/auth.util.js";

const signUp = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body; // Data from frontend

  if ([name, email, password].some((field) => field?.trim() === "")) {  // Validations
    throw new ApiError(400, "All fields are required");
  }

  if (password.length < 6) {
    throw new ApiError(400, "Password must be at least 6 characters long");
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new ApiError(400, "Invalid email format");
  }

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(409, "User with given email already exists");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new User({
    fullName: name,
    email,
    password: hashedPassword,
  });
  if (newUser) {
    const savedUser = await newUser.save();
    generateToken(savedUser._id, res);

    res.status(201).json(
      new ApiResponse(201, "User registered successfully", {
        _id: savedUser._id,
        name: savedUser.fullName,
        email: savedUser.email,
        profilePic: savedUser.profilePic,
      }),
    );

    // TODO: Send welcome email to the user
  } else {
    throw new ApiError(400, "Invalid user data");
  }
});

export { signUp };