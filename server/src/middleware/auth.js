import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export function requireAuth(req, res, next) {
    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer ") ? header.slice(7) : null;
    if (!token)
        return res.status(401).json({ error: { code: "NO_TOKEN", message: "Missing token" } });

    try {
        const payload = jwt.verify(token, env.JWT_SECRET);
        req.user = payload;
        next()
    } catch {
        return res.status(401).json({ error: { code: "BAD_TOKEN", message: "Invalid token" } });
    }
}


export function requireAdmin(req, res, next) {
    if (req.user?.role !== "admin") {
        return res.status(403).json({ error: { code: "FORBIDDEN", message: "Admin only" } });
    }
    next();
}