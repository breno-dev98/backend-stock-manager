import { DataTypes, UUIDV4 } from "sequelize";
import sequelize from "../config/db.js";
import Usuarios from "../models/usuarios.js";
import { defineUserRelation } from "../helpers/defineUserRelation.js";

const Fornecedores = sequelize.define('Fornecedores', {
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
    cnpj: {
        type: DataTypes.STRING(18),
        allowNull: false,
        set(value) {
            if (typeof value === 'string') {
                const onlyNumbers = value.replace(/\D/g, '');
                this.setDataValue('cnpj', onlyNumbers);
            } else {
                this.setDataValue('cnpj', value);
            }
        },
        validate: {
            notNull: {
                msg: "CNPJ não pode ser nulo"
            },
            len: {
                args: [14, 14],
                msg: "CNPJ deve conter exatamente 14 dígitos numéricos"
            }
        }
    },
    telefone: {
        type: DataTypes.STRING(20),
        allowNull: false,
        validate: {
            notNull: {
                msg: "Telefone não pode ser nulo"
            },
            notEmpty: {
                msg: "Telefone é obrigatório"
            },
            len: {
                args: [11, 11],
                msg: "Telefone deve conter exatamente 11 dígitos numéricos"
            },
            isNumeric: {
                msg: "Telefone deve conter apenas números"
            }
        }
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: true,
        validate: {
            isEmail: {
                msg: "E-mail inválido"
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
        onDelete: 'CASCADE'
    }
}, {
    tableName: "fornecedores",
    indexes: [
        {
            unique: true,
            fields: ['user_id', 'cnpj']
        }
    ]
});

defineUserRelation(Fornecedores, Usuarios);

export default Fornecedores;
