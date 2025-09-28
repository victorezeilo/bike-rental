import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../config/db.js";

export class BikeType extends Model {}
BikeType.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    code: { type: DataTypes.STRING, unique: true },
    name: { type: DataTypes.STRING }
  },
  { sequelize, modelName: "BikeType", tableName: "bike_types", timestamps: false }
);
