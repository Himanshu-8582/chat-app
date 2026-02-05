import express from "express";
import { signUp } from "../controllers/auth.controllers";

const router = express.Router();

router.post("/signup",signUp)

export default router;