import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { z } from "zod";
import {User} from "../models/User.js";
import { env } from "../config/env.js"

const RegisterSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8)
});

export async function register(req, res, next) {
    try {
        const { email, password } = RegisterSchema(req.body);
        const exists = await User.findOne({ where: { email } });
        if (exists)
            return res.status(409).json({ error: { code: "EMAIL_TAKEN", message: "Email in use" } });

        const hash = await bcrypt.hash(password, 10);
        const user = await User.create({ email, passwordHash: hash, role: "rider" });
        return res.status(201).json({
            id: user.id,
            email: user.email
        });
        
    } catch (e) {
        next(e);
    }
}

const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8)
});

export async function login(req, res, next) {
    try {
        const { email, password } = LoginSchema.parse(req.body);
        const user = await User.findOne({ where: { email } });
        if (!user)
            return res.status(401).json({ error: { code: "BAD_CREDENTIALS", message: "Invalid login" } });

        const ok = await bcrypt.compare(password, user.passwordHash);
        if (!ok) 
            return res.status(401).json({ error: { code: "BAD_CREDENTIALS", message: "Invalid login" } });

        const token = jwt.sign({ sub: user.id, role: user.role, email: user.email }, env.JWT_SECRET, {
            algorithm: "HS256",
            expiresIn: "30m"
        });
        return res.json({ access_token: token })

    } catch (e) {
        next(e);
    }
}
