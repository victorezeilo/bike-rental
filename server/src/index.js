import { app } from "./app.js";
import { env } from "./config/env.js";
import { sequelize } from "./config/db.js";

const start = async () => {
  try {
    await sequelize.authenticate();
    app.listen(Number(env.PORT), () => {
      console.log(`🚲 Server running on http://localhost:${env.PORT}`);
    });
  } catch (e) {
    console.error("DB connection failed:", e);
    process.exit(1);
  }
};

start();
