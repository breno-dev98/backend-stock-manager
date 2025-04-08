import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class categorias extends Model {
    static init(sequelize, DataTypes) {
        return super.init({
            id: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true
            },
            nome: {
                type: DataTypes.STRING(),
                allowNull: false,
                unique: true
            },
            descricao: {
                type: DataTypes.STRING(),
                allowNull: true,
            }
        }, {
            sequelize,
            tableName: 'categorias',
            schema: 'public',
            timestamps: true
        })
    }
}