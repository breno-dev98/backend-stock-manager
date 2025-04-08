import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class usuarios extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    nome: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "usuarios_email_key"
    },
    senha: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'usuarios',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "usuarios_email_key",
        unique: true,
        fields: [
          { name: "email" },
        ]
      },
      {
        name: "usuarios_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
