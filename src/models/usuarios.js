import  sequelize  from "../config/db.js";
import { DataTypes, UUIDV4 } from "sequelize";

const Usuarios = sequelize.define("Usuarios", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
    allowNull: false,
  },
  nome: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(255),
    unique: true,
    allowNull: false
  },
  senha: {
    type: DataTypes.STRING(60),
    allowNull: false
  }
},
  {
    tableName: "usuarios",
    timestamps: true
  })

export default Usuarios;