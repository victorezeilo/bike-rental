import { z } from "zod";
import { Bike } from "../models/Bike.js";
import { Helmet } from "../models/Helmet.js";
import { BikeType } from "../models/lookups/BikeType.js";
import { BikeSize } from "../models/lookups/BikeSize.js";
import { HelmetSize } from "../models/lookups/HelmetSize.js";
import { Rental } from "../models/Rental.js";
import { User } from "../models/User.js";

const CreateBikeSchema = z.object({
  typeCode: z.enum(["city", "mountain", "electric"]),
  sizeCode: z.enum(["kids", "small", "medium", "large", "xl"]),
  isElectric: z.boolean().optional().default(false),
  batteryPct: z.number().int().min(0).max(100).nullable().optional(),
  waterRating: z.string().nullable().optional()
});

export async function createBike(req, res, next) {
  try {
    const input = CreateBikeSchema.parse(req.body);
    const type = await BikeType.findOne({ where: { code: input.typeCode } });
    const size = await BikeSize.findOne({ where: { code: input.sizeCode } });
    if (!type || !size) return res.status(400).json({ error: { code: "BAD_LOOKUP", message: "Lookup missing" } });

    const bike = await Bike.create({
      typeId: type.id,
      sizeId: size.id,
      isElectric: input.isElectric ?? input.typeCode === "electric",
      batteryPct: input.isElectric || input.typeCode === "electric" ? input.batteryPct ?? 100 : null,
      waterRating: input.waterRating ?? null
    });
    res.status(201).json(bike);
  } catch (e) {
    next(e);
  }
}

const CreateHelmetSchema = z.object({
  sizeCode: z.enum(["xs", "s", "m", "l", "xl"])
});

export async function createHelmet(req, res, next) {
  try {
    const input = CreateHelmetSchema.parse(req.body);
    const size = await HelmetSize.findOne({ where: { code: input.sizeCode } });
    if (!size) return res.status(400).json({ error: { code: "BAD_LOOKUP", message: "Lookup missing" } });

    const helmet = await Helmet.create({ sizeId: size.id });
    res.status(201).json(helmet);
  } catch (e) {
    next(e);
  }
}

export async function listAllRentals(req, res, next) {
  try {
    const limit = Math.min(Number(req.query.limit) || 50, 200);
    const offset = Number(req.query.offset) || 0;

    const rentals = await Rental.findAll({
      include: [
        { model: User, as: "user", attributes: ["id", "email", "role"] },
        { model: Bike, as: "bike", attributes: ["id", "status", "isElectric", "batteryPct"] },
        { model: Helmet, as: "helmet", attributes: ["id", "status"] }
      ],
      order: [["createdAt", "DESC"]],
      limit,
      offset
    });

    res.json(rentals);
  } catch (e) {
    next(e);
  }
}
