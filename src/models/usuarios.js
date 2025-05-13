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
    validate: {
      notNull: {
        msg: "Nome não pode ser nulo"
      },
      notEmpty: {
        msg: "O campo nome é obrigatório"
      },
      isString(value) {
        if (typeof value !== "string") {
          throw new Error("O campo nome deve ser um texto");
        }
      }
    }
  },
  email: {
    type: DataTypes.STRING(255),
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "O campo email é obrigatório"
      },
      isEmail: {
        msg: "E-mail inválido"
      }
    }
  },
  senha: {
    type: DataTypes.STRING(60),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "O campo senha é obrigatório"
      },
      len: {
        args: [6, 60],
        msg: "A senha deve ter entre 6 e 60 caracteres"
      }
    }
  },
  papel: {
    type: DataTypes.ENUM('OWNER', 'ADMIN', 'ESTOQUISTA', 'COMPRADOR', 'CLIENT'),
    defaultValue: 'CLIENT',
    allowNull: false,
    validate: {
      isIn: {
        args: [['OWNER', 'ADMIN', 'ESTOQUISTA', 'COMPRADOR', 'CLIENT']],
        msg: "Papel inválido"
      }
    }
  },
  adminId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'usuarios',
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  }
},
  {
    tableName: "usuarios",
    timestamps: true
  })

defineUserAdminRelation(Usuarios, Usuarios)

export default Usuarios;