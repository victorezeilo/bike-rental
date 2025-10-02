import { Router } from "express";
import { createBike, createHelmet } from "../controllers/admin.controller.js";
import { requireAuth, requireAdmin } from "../middleware/auth.js";
import { listAllRentals } from "../controllers/admin.controller.js";


export const adminRouter = Router();
adminRouter.use(requireAuth, requireAdmin);
adminRouter.post("/bikes", createBike);
adminRouter.post("/helmets", createHelmet);
adminRouter.get("/rentals", listAllRentals);

