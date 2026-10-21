import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { connectDB } from "./lib/db.js";
import { app, server } from "./lib/socket.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, "../.env") });

app.use(cookieParser());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

const PORT = process.env.PORT || 3000;
const shouldServeFrontend = process.env.SERVE_FRONTEND === "true";

// Build allowed origins list from env vars
const allowedOrigins = [
  ...(process.env.CLIENT_URLS || "").split(","),
  ...(process.env.CLIENT_URL || "").split(","),
  // Render automatically sets RENDER_EXTERNAL_URL — include it so
  // the self-hosted frontend is never blocked by CORS
  process.env.RENDER_EXTERNAL_URL || "",
].map((o) => o.trim()).filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      // Allow requests with no origin (server-to-server, curl, mobile apps)
      if (!origin) return callback(null, true);

      // If serving frontend from same server, allow the request's own host
      // This handles the case where RENDER_EXTERNAL_URL isn't set yet
      if (shouldServeFrontend && allowedOrigins.length === 0) {
        return callback(null, true);
      }

      // Allow if origin is explicitly listed, or if no specific origins configured
      if (allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.warn(`CORS blocked origin: ${origin}`);
      console.warn(`Allowed origins: ${allowedOrigins.join(", ")}`);
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  }),
);

app.get("/api/health", (_, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

if (process.env.NODE_ENV === "production" && shouldServeFrontend) {
  const frontendDistPath = path.resolve(__dirname, "../../frontend/dist");
  app.use(express.static(frontendDistPath));

  app.get("*", (_, res) => {
    res.sendFile(path.join(frontendDistPath, "index.html"));
  });
}

server.listen(PORT, () => {
  console.log(`Server Running on ${PORT}`);
  console.log(`Allowed CORS origins: ${allowedOrigins.length > 0 ? allowedOrigins.join(", ") : "(all — none configured)"}`);
  connectDB();
});
