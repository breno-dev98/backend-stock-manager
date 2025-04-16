import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Produtos from "./produtos.js";
import Usuarios from "./usuarios.js";
import Fornecedores from "./fornecedores.js";

const Entradas = sequelize.define("Entradas", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },

    produto_id: {
        type: DataTypes.UUID,
        allowNull: false,
        validate: {
            notNull: { msg: "O produto é obrigatório" }
        }
    },

    quantidade: {
        type: DataTypes.DECIMAL(10, 3), // suporta unidades fracionadas
        allowNull: false,
        validate: {
            notNull: { msg: "A quantidade é obrigatória" },
            isDecimal: { msg: "A quantidade deve ser um número decimal" },
            min: {
                args: [0.001],
                msg: "A quantidade deve ser maior que zero"
            }
        }
    },

    data_entrada: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
            notNull: { msg: "A data de entrada é obrigatória" },
            isDate: { msg: "A data de entrada deve ser uma data válida" }
        }
    },

    preco_compra: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            notNull: { msg: "O preço de compra é obrigatório" },
            isDecimal: { msg: "O preço de compra deve ser um valor numérico com duas casas decimais" },
            min: {
                args: [0],
                msg: "O preço de compra não pode ser negativo"
            }
        }
    },

    fornecedor_id: {
        type: DataTypes.UUID,
        allowNull: true // pode ser null se for entrada direta sem fornecedor
    },

    user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        validate: {
            notNull: { msg: "O usuário que registrou é obrigatório" }
        }
    }
}, {
    tableName: 'entradas',
    timestamps: true
});

Entradas.belongsTo(Produtos, {
    foreignKey: 'produto_id',
    as: 'produto'
});

Entradas.belongsTo(Fornecedores, {
    foreignKey: 'fornecedor_id',
    as: 'fornecedor'
});

Entradas.belongsTo(Usuarios, {
    foreignKey: 'user_id',
    as: 'usuario'
});

export default Entradas;