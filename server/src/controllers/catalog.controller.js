import { Op } from "sequelize";
import { Bike } from "../models/Bike.js";
import { Helmet } from "../models/Helmet.js";
import { BikeType } from "../models/lookups/BikeType.js";
import { BikeSize } from "../models/lookups/BikeSize.js";
import { HelmetSize } from "../models/lookups/HelmetSize.js";

export async function listBikes(req, res, next) {
  try {
    const { type, size, status = "available" } = req.query;
    const where = { status };
    if (type) where.typeId = { [Op.not]: null }; // placeholder; we filter via include.where
    if (size) where.sizeId = { [Op.not]: null };

    const bikes = await Bike.findAll({
      where,
      include: [
        { model: BikeType, as: "type", where: type ? { code: type } : undefined, required: !!type },
        { model: BikeSize, as: "size", where: size ? { code: size } : undefined, required: !!size }
      ],
      order: [["createdAt", "DESC"]]
    });
    res.json(bikes);
  } catch (e) {
    next(e);
  }
}

export async function listHelmets(req, res, next) {
  try {
    const { size, status = "available" } = req.query;
    const helmets = await Helmet.findAll({
      where: { status },
      include: [{ model: HelmetSize, as: "size", where: size ? { code: size } : undefined, required: !!size }],
      order: [["createdAt", "DESC"]]
    });
    res.json(helmets);
  } catch (e) {
    next(e);
  }
}
