import express from "express";
import { signUp, login, logout, updateProfile } from "../controllers/auth.controllers.js";
import { protectedRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/signup", signUp);
router.post('/login', login);
router.post('/logout', logout);

// Protected route
router.put('/update-profile',protectedRoute, updateProfile);

export default router;