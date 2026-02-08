import express from 'express';
import { protectedRoute } from "../middlewares/auth.middleware.js";
import { getAllContacts, getChatPartners, getMessagesByUserId, sendMessage } from '../controllers/message.controllers.js';
import { arcjetProtection } from "../middlewares/arcjet.middleware.js";

const router = express.Router();

router.use(arcjetProtection, protectedRoute);

router.get('/contacts', getAllContacts);
router.get('/chats', getChatPartners);
router.get('/:id', getMessagesByUserId);


router.post("/send/:id", sendMessage);


export default router;