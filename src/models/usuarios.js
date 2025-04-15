import  sequelize  from "../config/db.js";
import { DataTypes, UUIDV4 } from "sequelize";
import { defineUserAdminRelation } from "../helpers/defineUserAdminRelation.js";

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
  },
  papel: {
    type: DataTypes.ENUM('OWNER', 'ADMIN', 'MODERADOR', 'FUNCIONARIO', 'CLIENT'),
    defaultValue: 'CLIENT',
    allowNull: false
  },
  adminId: {
    type: DataTypes.UUID,
    allowNull: false, // OWNER pode criar também, então deixe true
    references: {
      model: 'usuarios',
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE' // se o admin for deletado, os usuários ficam sem dono
  }
},
  {
    tableName: "usuarios",
    timestamps: true
  })

defineUserAdminRelation(Usuarios, Usuarios)

export default Usuarios;