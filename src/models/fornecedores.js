import { DataTypes, UUIDV4 } from "sequelize";
import sequelize from "../config/db.js";
import Usuarios from "../models/usuarios.js";
import { defineUserRelation } from "../helpers/defineUserRelation.js";

const Fornecedores = sequelize.define('Fornecedores', {
    id: {
        type: DataTypes.UUID,              // Define o tipo como UUID (identificador único universal)
        primaryKey: true,                  // Define como chave primária da tabela
        defaultValue: UUIDV4,              // Gera automaticamente um UUID versão 4
        allowNull: false,                  // Não permite valor nulo
    },
    nome: {
        type: DataTypes.STRING(255),       // Campo de texto com no máximo 255 caracteres
        allowNull: false,                  // Obrigatório preencher
    },
    cnpj: {
        type: DataTypes.STRING(18),        // CNPJ com máscara (ex: 00.000.000/0000-00)
        allowNull: false,                  // Obrigatório preencher
        unique: true                       // Não pode haver dois fornecedores com o mesmo CNPJ
    },
    telefone: {
        type: DataTypes.STRING(20),        // Campo de telefone (ex: (00) 00000-0000)
        allowNull: true                    // Campo opcional
    },
    email: {
        type: DataTypes.STRING(255),      // Campo de texto para e-mail com até 255 caracteres
        allowNull: true,                  // Pode ser opcional
        validate: {
            isEmail: true                 // Valida se é um e-mail válido
        }
    },
    user_id: {
        type: DataTypes.UUID,              // UUID do usuário que cadastrou
        allowNull: false,                  // Obrigatório
        references: {
            model: Usuarios,               // Faz referência ao model de usuários
            key: "id"
        },
        onDelete: 'CASCADE'
    }
}, {
    tableName: "fornecedores",             // Define o nome real da tabela no banco de dados
});

// Define a relação entre o fornecedor e o usuário (provavelmente 1:N)
defineUserRelation(Fornecedores, Usuarios);

export default Fornecedores;
