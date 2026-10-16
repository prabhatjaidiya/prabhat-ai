import express from "express";
import cors from "cors";
import { rateLimit } from "express-rate-limit";
import chatRouter from "./routes/chat.routes";

const app = express();

app.use(cors());
app.use(express.json());

const chatRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 20, // 20 requests per IP per window
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many chat requests. Please try again later.",
  },
});

app.use("/api/chat", chatRateLimiter);
app.use("/api", chatRouter);

app.get("/api/health", (_req, res) => {
  res.json({
    success: true,
    message: "Prabhat AI server is running",
  });
});

export default app;