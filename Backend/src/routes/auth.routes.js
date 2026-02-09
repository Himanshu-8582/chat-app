import express from "express";
import { signUp, login, logout, updateProfile } from "../controllers/auth.controllers.js";
import { protectedRoute } from "../middlewares/auth.middleware.js";
import { arcjetProtection } from "../middlewares/arcjet.middleware.js";
import ApiResponse from "../utils/ApiResponse.js";

const router = express.Router();

// router.get("/test", arcjetProtection, (req, res) => {
//   return res.status(200).json(new ApiResponse(200, "Test successful"));
// });

router.use(arcjetProtection);

router.post("/signup", signUp);
router.post('/login', login);
router.post('/logout', logout);

// Protected route
router.put('/update-profile',protectedRoute, updateProfile);

router.get("/check", protectedRoute, (req, res) =>
  res.status(200).json(req.user),
);

export default router;