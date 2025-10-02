import express from "express";
import helmet from "helmet";
import cors from "cors";
import { sequelize } from "./config/db.js";
import { authRouter } from "./routes/auth.routes.js";
import { catalogRouter } from "./routes/catalog.routes.js";
import { adminRouter } from "./routes/admin.routes.js";
import { errorHandler } from "./middleware/error.js";
import { rentalsRouter } from "./routes/rentals.routes.js";

const app = express();
app.use(helmet());
app.use(cors({ origin: ["http://localhost:5173", "http://localhost:5174"] })); // Vite dev
app.use(express.json());

// Minimal health endpoint (no auth)
app.get("/api/v1/health", async (_req, res) => {
  try {
    await sequelize.authenticate();
    res.json({ ok: true, db: "up" });
  } catch (e) {
    res.status(500).json({ ok: false, db: "down", error: e?.message });
  }
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1", catalogRouter);         // /bikes, /helmets
app.use("/api/v1/admin", adminRouter);     // admin-only
app.use("/api/v1/rentals", rentalsRouter);
app.use(errorHandler);

export { app };
