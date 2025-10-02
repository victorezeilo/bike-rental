import * as rentalService from "../services/rentals.js";
import { Rental } from "../models/Rental.js";
import { Bike } from "../models/Bike.js";
import { Helmet } from "../models/Helmet.js";


export async function reserve(req, res, next) {
  try {
    const { bikeId, helmetId } = req.body;
    const rental = await rentalService.reserveBike({ userId: req.user.sub, bikeId, helmetId });
    res.status(201).json({ rentalId: rental.id, unlockCode: rental.unlockCode });
  } catch (e) {
    next(e);
  }
}

export async function unlock(req, res, next) {
  try {
    const { rentalId, code } = req.body;
    const rental = await rentalService.unlockRental({ rentalId, code });
    res.json({ status: rental.status });
  } catch (e) {
    next(e);
  }
}

export async function start(req, res, next) {
  try {
    const { rentalId } = req.body;
    const rental = await rentalService.startRide({ rentalId });
    res.json({ status: rental.status, startedAt: rental.startedAt });
  } catch (e) {
    next(e);
  }
}

export async function listMy(req, res, next) {
  try {
    const limit = Math.min(Number(req.query.limit) || 20, 100);
    const offset = Number(req.query.offset) || 0;

    const rentals = await Rental.findAll({
      where: { userId: req.user.sub },
      include: [
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