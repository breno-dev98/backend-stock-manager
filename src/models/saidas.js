import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Produtos from "./produtos.js";
import Usuarios from "./usuarios.js";

const Saidas = sequelize.define("Saidas", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },

    produto_id: {
        type: DataTypes.UUID,
        allowNull: false,
        validate: {
            notNull: { msg: "O produto é obrigatório" },
        },
    },

    quantidade: {
        type: DataTypes.DECIMAL(10, 3),
        allowNull: false,
        validate: {
            notNull: { msg: "A quantidade é obrigatória" },
            isDecimal: { msg: "A quantidade deve ser um número decimal" },
            min: {
                args: [0.001],
                msg: "A quantidade deve ser maior que zero",
            },
        },
    },

    data_saida: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
            notNull: { msg: "A data de saída é obrigatória" },
            isDate: { msg: "A data de saída deve ser uma data válida" },
        },
    },

    destino: {
        type: DataTypes.STRING(100),
        allowNull: true, // Ex: Cliente, Departamento
        validate: {
            len: {
                args: [0, 100],
                msg: "O destino deve ter no máximo 100 caracteres",
            },
        },
    },

    observacao: {
        type: DataTypes.STRING(255),
        allowNull: true,
        validate: {
            len: {
                args: [0, 255],
                msg: "A observação deve ter no máximo 255 caracteres",
            },
        },
    },

    user_id: {
        type: DataTypes.UUID,
        allowNull: false, // Será preenchido automaticamente via req.user.id
        validate: {
            notNull: { msg: "O usuário que registrou é obrigatório" },
        },
    },
}, {
    tableName: "saidas",
    timestamps: true,
});

// Relações
Saidas.belongsTo(Produtos, {
    foreignKey: "produto_id",
    as: "produto",
});

Saidas.belongsTo(Usuarios, {
    foreignKey: "user_id",
    as: "usuario",
});

export default Saidas;
