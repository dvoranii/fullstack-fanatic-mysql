import express from "express";
import cors from "cors";
import helmet from "helmet";
import path from "path";
import tutorialsRouter from "./routes/tutorials";
import commentsRouter from "./routes/comments";
import blogsRouter from "./routes/blogs";
import userRouter from "./routes/user";
import favouriteRouter from "./routes/favourites";
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

app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/assets", express.static(path.join(__dirname, "../public/assets")));

app.use("/api/tutorials", tutorialsRouter);
app.use("/api/comments", commentsRouter);
app.use("/api/blogs", blogsRouter);
app.use("/api/users", userRouter);
app.use("/api/favourites", favouriteRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
