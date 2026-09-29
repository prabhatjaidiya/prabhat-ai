import { Router } from "express";
import { chatController } from "../controllers/chat.controller";

const router = Router();

router.post("/chat", chatController);

export default router;