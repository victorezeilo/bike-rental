import { Router } from "express";
import { reserve, unlock, start, listMy } from "../controllers/rentals.controller.js";
import { requireAuth } from "../middleware/auth.js";

export const rentalsRouter = Router();
rentalsRouter.use(requireAuth);

rentalsRouter.post("/reserve", reserve);
rentalsRouter.post("/unlock", unlock);
rentalsRouter.post("/start", start);
rentalsRouter.get("/my", listMy);