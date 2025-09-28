import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db.js";
import { BikeType } from "./lookups/BikeType.js";
import { BikeSize } from "./lookups/BikeSize.js";

export class Bike extends Model {}
Bike.init(
  {
    id: { 
        type: DataTypes.UUID, 
        defaultValue: DataTypes.UUIDV4, 
        primaryKey: true 
    },

    isElectric: { 
        type: DataTypes.BOOLEAN, 
        defaultValue: false
    },

    batteryPct: { 
        type: DataTypes.INTEGER, 
        allowNull: true 
    },

    status: { 
        type: DataTypes.ENUM("available", "reserved", "in_use", "maintenance"),
        defaultValue: "available" 
    },
    
    waterRating: { 
        type: DataTypes.STRING, 
        allowNull: true
    }
  },
  { sequelize, modelName: "Bike", tableName: "bikes", timestamps: true }
);

Bike.belongsTo(BikeType, {as: "type", foreignKey: "typeId"});
Bike.belongsTo(BikeSize, {as: "size", foreignKey: "sizeId"});