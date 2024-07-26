import express from "express";
import cors from "cors";
import tutorialsRouter from "./routes/tutorials";
import commentsRouter from "./routes/comments";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/tutorials", tutorialsRouter);
app.use("/api/comments", commentsRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
