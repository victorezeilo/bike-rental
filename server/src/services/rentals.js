import {randomInt} from "crypto";
import {addMinutes} from "date-fns";
import { Rental } from "../models/Rental.js";
import { Bike } from "../models/Bike.js";
import { Helmet } from "../models/Helmet.js";



export async function reserveBike({ userId, bikeId, helmetId }) {
    const bike = await Bike.findByPk(bikeId);
    if (!bike || bike.status !== "available")
        throw new Error("This bike is not available");

    let helmet = null;
    if (helmetId) {
        helmet = await Helmet.findByPk(helmetId);
        if (!helmet || helmet.status !== "available")
            throw new Error("Helmet not available")
    }

    const unlockCode = String(randomInt(100000, 999999));
    const unlockExpiresAt = addMinutes(new Date(), 5);

    const rental = await Rental.create ({
        userId,
        bikeId,
        helmetId: helmet?.id,
        status: "reserved",
        reserveAt: new Date(),
        unlockCode,
        unlockExpiresAt
    });

    await bike.update({ status: "reserved" });
    if (helmet) await helmet.update({ status: "reserved" });

    return rental;
}

export async function unlockRental({ rentalId, code }) {
    const rental = await Rental.findByPk(rentalId, {
        include: [
            { model: Bike, as: "bike" },
            { model: Helmet, as: "helmet" }
        ]
    });
    if (!rental)
        throw new Error("Rental not found");
    if ((rental.status !== "reserved"))
        throw new Error("Rental not found");
    if (rental.unlockCode !== code)
        throw new Error("Rental not found");
    if (new Date() > rental.unlockExpiresAt)
        throw new Error("Code expired");

    await rental.bike.update({status: "in_use"});
    if (rental.helmet)
        await rental.helmet.update({status: "in_use"});

    await rental.update({status: "unlocked", unlockedAt: new Date()});

    return rental;
}


export async function startRide({ rentalId }) {
  const rental = await Rental.findByPk(rentalId, { 
        include: [
            { model: Bike, as: "bike" },
            { model: Helmet, as: "helmet" }
        ]
});
  if (!rental) throw new Error("Rental not found");
  if (rental.status !== "unlocked") throw new Error("Must be unlocked first");

  await rental.update({ status: "riding", startedAt: new Date() });
  return rental;
}

