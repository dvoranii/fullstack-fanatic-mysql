import express from "express";
import cors from "cors";
import helmet from "helmet";
import tutorialsRouter from "./routes/tutorials";
import commentsRouter from "./routes/comments";
import blogsRouter from "./routes/blogs";
import userRouter from "./routes/user";
import favouriteRouter from "./routes/favourites";
import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser());

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/tutorials", tutorialsRouter);
app.use("/api/comments", commentsRouter);
app.use("/api/blogs", blogsRouter);
app.use("/api/users", userRouter);
app.use("/api/favourites", favouriteRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
