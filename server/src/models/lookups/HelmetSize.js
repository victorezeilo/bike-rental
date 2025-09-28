import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../config/db.js";

export class HelmetSize extends Model {}
HelmetSize.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    code: { type: DataTypes.STRING, unique: true },
    name: { type: DataTypes.STRING }
  },
  { sequelize, modelName: "HelmetSize", tableName: "helmet_sizes", timestamps: false }
);
