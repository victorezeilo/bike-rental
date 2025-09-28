import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db.js";
import { User } from "./User.js";
import { Bike } from "./Bike.js";
import { Helmet } from "./Helmet.js";

export class Rental extends Model {}
Rental.init(
  {
    id: { 
        type: DataTypes.UUID, 
        defaultValue: DataTypes.UUIDV4, 
        primaryKey: true 
    },

    reservedAt: { 
        type: DataTypes.DATE, 
        allowNull: true
    },

    unlockCode: { 
        type: DataTypes.STRING, 
        allowNull: true 
    },

    unlockExpireAt: { 
        type: DataTypes.DATE, 
        allowNull: true 
    },

    unlockedAt: { 
        type: DataTypes.DATE, 
        allowNull: true 
    },

    startedAt: { 
        type: DataTypes.DATE, 
        allowNull: true 
    },

    endedAt: { 
        type: DataTypes.DATE, 
        allowNull: true 
    },

    status: { 
        type: DataTypes.ENUM("unlocked", "reserved", "riding", "completed", "cancelled", "failed"), 
        defaultValue: "reserved" 
    },
    
    costCents: { 
        type: DataTypes.INTEGER, 
        allowNull: true
    }
  },
  { sequelize, modelName: "Rental", tableName: "rentals", timestamps: true }
);

Rental.belongsTo(User, {as: "user", foreignKey: "userId"});
Rental.belongsTo(Bike, {as: "bike", foreignKey: "bikeId"});
Rental.belongsTo(Helmet, {as: "helmet", foreignKey: "helmetId", allowNull: true});