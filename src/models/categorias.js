import { DataTypes, UUIDV4 } from "sequelize";
import sequelize from "../config/db.js";
import Usuarios from "../models/usuarios.js";
import { defineUserRelation } from "../helpers/defineUserRelation.js";

const Categoria = sequelize.define('Categoria', {
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
  user_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Usuarios,
      key: "id"
    }
  }
}, {
  tableName: "categoria",
})
defineUserRelation(Categoria, Usuarios)

export default Categoria;