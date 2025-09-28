import { Sequelize } from "sequelize";
import { env } from "./env.js";

export const sequelize = new Sequelize({
  host: env.PGHOST,
  port: Number(env.PGPORT),
  username: env.PGUSER,
  password: env.PGPASSWORD,
  database: env.PGDATABASE,
  dialect: "postgres",
  logging: false
});