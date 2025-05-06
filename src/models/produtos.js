import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Usuarios from "../models/usuarios.js";
import Marcas from "../models/marcas.js";
import Categorias from "../models/categorias.js";
import Fornecedores from "../models/fornecedores.js";

const Produtos = sequelize.define('Produtos', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
    },
    nome: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
            notEmpty: { msg: 'O nome do produto é obrigatório' },
            len: {
                args: [3, 255],
                msg: 'O nome deve ter entre 3 e 255 caracteres'
            }
        }
    },
    descricao: {
        type: DataTypes.STRING(500),
        allowNull: true,
        validate: {
            len: {
                args: [0, 500],
                msg: 'A descrição deve ter no máximo 500 caracteres'
            }
        }
    },
    preco_custo: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            notEmpty: { msg: 'O preco_custo do produto é obrigatório' },
            notNull: { msg: 'O preco_custo do produto não pode ser nulo' },
            isDecimal: { msg: 'O preço de custo deve ser um número decimal' },
            min: {
                args: [0],
                msg: 'O preço de custo não pode ser negativo'
            }
        }
    },
    preco_venda: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            notEmpty: { msg: 'O preco_venda do produto é obrigatório' },
            notNull: {msg: 'O preco_venda do produto não pode ser nulo'},
            isDecimal: { msg: 'O preço de venda deve ser um número decimal' },
            min: {
                args: [0],
                msg: 'O preço de venda não pode ser negativo'
            },
            isMaiorQueCusto(value) {
                if (parseFloat(value) < parseFloat(this.preco_custo)) {
                    throw new Error('O preço de venda deve ser maior que o preço de custo');
                }
            }
        }
    },
    ean: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            isValidEAN(value) {
                const ean13Regex = /^789\d{10}$/;
                const internoRegex = /^\d{5}$/;

                if (value && !ean13Regex.test(value) && !internoRegex.test(value)) {
                    throw new Error('EAN inválido. Use EAN-13 (começando com 789) ou código interno de 5 dígitos.');
                }
            }
        }
    },
    quantidade: {
        type: DataTypes.DECIMAL(10, 3), // permite até 3 casas decimais
        allowNull: false,
        defaultValue: 0,
        validate: {
            isDecimal: { msg: 'A quantidade deve ser um número' },
            min: {
                args: [0],
                msg: 'A quantidade não pode ser negativa'
            },
            validaUnidadeComQuantidade() {
                const unidadesInteiras = ['UNIDADE', 'PC', 'CX'];
                const isDecimal = !Number.isInteger(Number(this.quantidade));

                if (unidadesInteiras.includes(this.unidade_medida) && isDecimal) {
                    throw new Error(`A unidade "${this.unidade_medida}" não permite valor com casas decimais.`);
                }
            }
        }
    },
    unidade_medida: {
        type: DataTypes.ENUM('UNIDADE', 'KG', 'LITRO', 'CX', 'PC'),
        allowNull: false,
        defaultValue: 'UNIDADE',
        validate: {
            notNull: {msg: 'A unidade_medida do produto não pode ser nula'},
            isIn: {
                args: [['UNIDADE', 'KG', 'LITRO', 'CX', 'PC']],
                msg: 'Unidade de medida inválida'
            }
        }
    },

    // fk's
    user_id: {
        type: DataTypes.UUID,
        allowNull: false
    },
    marca_id: {
        type: DataTypes.UUID,
        allowNull: true
    },
    categoria_id: {
        type: DataTypes.UUID,
        allowNull: true
    },
    fornecedor_id: {
        type: DataTypes.UUID,
        allowNull: true
    }
}, {
    tableName: 'produtos',
    timestamps: true
});


Produtos.belongsTo(Usuarios, {
    foreignKey: 'user_id',
    as: 'usuario'
});

Produtos.belongsTo(Marcas, {
    foreignKey: 'marca_id',
    as: 'marca'
});

Produtos.belongsTo(Categorias, {
    foreignKey: 'categoria_id',
    as: 'categoria'
});

Produtos.belongsTo(Fornecedores, {
    foreignKey: 'fornecedor_id',
    as: 'fornecedor'
});

export default Produtos;