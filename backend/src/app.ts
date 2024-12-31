import express from "express";
import security from "./middleware/security";
import cors from "cors";
import path from "path";
import profileRoutes from "./routes/profile";
import tutorialsRoutes from "./routes/tutorials";
import commentsRoutes from "./routes/comments";
import blogsRoutes from "./routes/blogs";
import userRoutes from "./routes/user";
import favouriteRoutes from "./routes/favourites";
import conversationsRoutes from "./routes/conversations";
import messagesRoutes from "./routes/messages";
import notificationsRoutes from "./routes/notifications";
import formsRoutes from "./routes/forms";
import stripeRoutes from "./routes/stripe";
import networkRoutes from "./routes/network";
import purchasesRoutes from "./routes/purchases";
import csrfRoutes from "./routes/csrf";
import { Server } from "socket.io";
import http from "http";
import cookieParser from "cookie-parser";

import {
  authRateLimiter,
  commentRateLimiter,
  formRateLimiter,
  contentRateLimiter,
} from "./middleware/rateLimit";

const app = express();
app.use(cookieParser());
security(app);

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:4173",
  process.env.CLIENT_URL || "https://fullstackfanatic.com",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
    allowedHeaders: ["Authorization", "Content-Type", "x-csrf-token"],
  })
);

app.use((_req, res, next) => {
  res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
  next();
});

app.use((req, res, next) => {
  if (req.originalUrl === "/api/stripe/webhook") {
    next();
  } else {
    express.json()(req, res, next);
  }
});

app.use(express.urlencoded({ extended: true }));

app.use("/assets", express.static(path.join(__dirname, "../public/assets")));

app.use("/api/profile", profileRoutes);
app.use("/api/favourites", favouriteRoutes);
app.use("/api/conversations", conversationsRoutes);
app.use("/api/messages", messagesRoutes);
app.use("/api/notifications", notificationsRoutes);
app.use("/api/stripe", stripeRoutes);
app.use("/api/network", networkRoutes);
app.use("/api/purchases", purchasesRoutes);
app.use("/api/csrf", csrfRoutes);

// Rate limited
// app.use("/api/users", authRateLimiter, userRoutes);
// app.use("/api/comments", commentRateLimiter, commentsRoutes);
// app.use("/api/forms", formRateLimiter, formsRoutes);
// app.use("/api/blogs", contentRateLimiter, blogsRoutes);
// app.use("/api/tutorials", contentRateLimiter, tutorialsRoutes);

app.use("/api/users", userRoutes);
app.use("/api/comments", commentsRoutes);
app.use("/api/forms", formsRoutes);
app.use("/api/blogs", blogsRoutes);
app.use("/api/tutorials", tutorialsRoutes);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin:
      process.env.NODE_ENV === "production"
        ? process.env.CLIENT_URL || "https://fullstackfanatic.com"
        : "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });

  socket.on("sendMessage", (message) => {
    console.log("New message received:", message);
    io.emit("newMessage", message);
  });
});

export { io };

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
