import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../config/db.js";

export class BikeSize extends Model {}
BikeSize.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    code: { type: DataTypes.STRING, unique: true },
    name: { type: DataTypes.STRING }
  },
  { sequelize, modelName: "BikeSize", tableName: "bike_sizes", timestamps: false }
);
