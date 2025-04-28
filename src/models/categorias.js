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
    validate: {
      notNull: {
        msg: "Nome não pode ser nulo"
      },
      notEmpty: {
        msg: "Nome é obrigatório"
      },
      isString(value) {
        if (typeof value !== "string") {
          throw new Error("O campo nome deve ser do tipo string");
        }
      } 
    }
  },
  user_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Usuarios,
      key: "id"
    },
    onDelete: 'CASCADE',
  }
}, {
  tableName: "categoria",
})
defineUserRelation(Categoria, Usuarios)

export default Categoria;