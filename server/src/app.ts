import express, { type ErrorRequestHandler } from "express";
import cors from "cors";
import { rateLimit } from "express-rate-limit";
import chatRouter from "./routes/chat.routes";

const app = express();

const allowedOrigins = new Set([
  "http://localhost:5173",
  "http://127.0.0.1:5173",
]);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests without an Origin header (e.g. local CLI tools).
      if (!origin || allowedOrigins.has(origin)) {
        return callback(null, true);
      }

      // Do not grant browser CORS access to other origins.
      return callback(null, false);
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
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

const errorHandler: ErrorRequestHandler = (
  error,
  _req,
  res,
  _next,
) => {
  const statusCode =
    typeof error === "object" &&
    error !== null &&
    "status" in error &&
    typeof error.status === "number"
      ? error.status
      : 500;

  if (
    error instanceof SyntaxError &&
    statusCode === 400
  ) {
    return res.status(400).json({
      success: false,
      message: "Invalid JSON request body",
    });
  }

  if (statusCode === 413) {
    return res.status(413).json({
      success: false,
      message: "Request body is too large",
    });
  }

  console.error("Unhandled request error:", {
    errorType:
      error instanceof Error
        ? error.name
        : "UnknownError",
  });

  return res.status(500).json({
    success: false,
    message: "An unexpected server error occurred",
  });
};

app.use(errorHandler);

export default app;