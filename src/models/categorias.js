import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class categorias extends Model {
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
      allowNull: false,
      unique: "categorias_nome_key1"
    }
  }, {
    sequelize,
    tableName: 'categorias',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "categorias_nome_key",
        unique: true,
        fields: [
          { name: "nome" },
        ]
      },
      {
        name: "categorias_nome_key1",
        unique: true,
        fields: [
          { name: "nome" },
        ]
      },
      {
        name: "categorias_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
