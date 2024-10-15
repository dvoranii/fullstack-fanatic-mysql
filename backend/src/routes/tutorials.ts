import express, { Request, Response } from "express";
import connectionPromise from "../db";
import { RowDataPacket } from "mysql2";
import { Tutorial } from "../types/Tutorial";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const connection = await connectionPromise;
    const [results] = await connection.query<RowDataPacket[]>(
      "SELECT * FROM tutorials"
    );
    res.json(results as Tutorial[]);
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ error: error.message });
  }
});

// router.get("/", async (req: Request, res: Response) => {
//   const page = parseInt(req.query.page as string) || 1; // default to page 1
//   const limit = parseInt(req.query.limit as string) || 8; // default limit per page
//   const offset = (page - 1) * limit;

//   try {
//     const connection = await connectionPromise;

//     const [countResult] = await connection.query<RowDataPacket[]>(
//       "SELECT COUNT(*) as total FROM tutorials"
//     );
//     const total = countResult[0].total;

//     const [results] = await connection.query<RowDataPacket[]>(
//       "SELECT * FROM tutorials LIMIT ? OFFSET ?",
//       [limit, offset]
//     );

//     res.json({
//       tutorials: results as Tutorial[],
//       total,
//       page,
//       totalPages: Math.ceil(total / limit),
//     });
//   } catch (err) {
//     const error = err as Error;
//     res.status(500).json({ error: error.message });
//   }
// });

router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };

  try {
    const connection = await connectionPromise;
    const [results] = await connection.query<RowDataPacket[]>(
      "SELECT * FROM tutorials WHERE id = ?",
      [id]
    );
    res.json(results[0] as Tutorial);
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ error: error.message });
  }
});

export default router;
