import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db.js";
import { HelmetSize } from "./lookups/HelmetSize.js";

export class Helmet extends Model {}
Helmet.init(
  {
    id: { 
        type: DataTypes.UUID, 
        defaultValue: DataTypes.UUIDV4, 
        primaryKey: true 
    },

    status: { 
        type: DataTypes.ENUM("available", "reserved", "in_use", "maintenance"), 
        defaultValue: "available" 
    }
    
  },
  { sequelize, modelName: "Helmet", tableName: "helmets", timestamps: true }
);

Helmet.belongsTo(HelmetSize, {as: "size", foreignKey: "sizeId"});