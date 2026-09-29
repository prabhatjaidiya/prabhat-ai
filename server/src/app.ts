import express from "express";
import cors from "cors";
import chatRouter from "./routes/chat.routes";

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api", chatRouter);

app.get("/api/health", (_req, res) => {
  res.json({
    success: true,
    message: "Prabhat AI server is running",
  });
});

export default app;