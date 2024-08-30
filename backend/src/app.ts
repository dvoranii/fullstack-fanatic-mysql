import express from "express";
import cors from "cors";
import helmet from "helmet";
import path from "path";
import tutorialsRoutes from "./routes/tutorials";
import commentsRoutes from "./routes/comments";
import blogsRoutes from "./routes/blogs";
import userRoutes from "./routes/user";
import favouriteRoutes from "./routes/favourites";
import profileRoutes from "./routes/profile";
import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser());

app.use(helmet());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    allowedHeaders: ["Authorization", "Content-Type"],
  })
);

// potential security issues...
app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/assets", express.static(path.join(__dirname, "../public/assets")));

app.use("/api/tutorials", tutorialsRoutes);
app.use("/api/comments", commentsRoutes);
app.use("/api/blogs", blogsRoutes);
app.use("/api/users", userRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/favourites", favouriteRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
