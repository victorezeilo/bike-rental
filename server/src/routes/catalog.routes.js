import { Router } from "express";
import { listBikes, listHelmets } from "../controllers/catalog.controller.js";
export const catalogRouter = Router();
catalogRouter.get("/bikes", listBikes);
catalogRouter.get("/helmets", listHelmets);

