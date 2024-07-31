import express from "express";
import cors from "cors";
import helmet from "helmet";
import tutorialsRouter from "./routes/tutorials";
import commentsRouter from "./routes/comments";
import blogsRouter from "./routes/blogs";
import googleSignIn from "./routes/googleSignIn";

const app = express();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(helmet());
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
  next();
});

app.use("/api/tutorials", tutorialsRouter);
app.use("/api/comments", commentsRouter);
app.use("/api/blogs", blogsRouter);
app.use("/api/auth/google-sign-in", googleSignIn);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
