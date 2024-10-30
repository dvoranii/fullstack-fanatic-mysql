import express from "express";
import cors from "cors";
import helmet from "helmet";
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
import { Server } from "socket.io";
import http from "http";

import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser());

app.use(helmet());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
    allowedHeaders: ["Authorization", "Content-Type"],
  })
);

app.use((req, res, next) => {
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

app.use("/api/tutorials", tutorialsRoutes);
app.use("/api/comments", commentsRoutes);
app.use("/api/blogs", blogsRoutes);
app.use("/api/users", userRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/favourites", favouriteRoutes);
app.use("/api/conversations", conversationsRoutes);
app.use("/api/messages", messagesRoutes);
app.use("/api/notifications", notificationsRoutes);
app.use("/api/forms", formsRoutes);
app.use("/api/stripe", stripeRoutes);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
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

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
