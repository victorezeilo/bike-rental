import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db.js";


export class User extends Model {}

User.init(
  {
    id: { 
        type: DataTypes.UUID, 
        defaultValue: DataTypes.UUIDV4, 
        primaryKey: true 
    },

    email: { 
        type: DataTypes.STRING, 
        allowNull: false, 
        unique: true, 
        validate: { isEmail: true }
    },

    passwordHash: { 
        type: DataTypes.STRING, 
        allowNull: false 
    },

    role: { 
        type: DataTypes.ENUM("rider", "admin"), 
        allowNull: false, 
        defaultValue: "admin" 
    }
  },
  { sequelize, modelName: "User", tableName: "users", timestamps: true }
);