import _sequelize from "sequelize";
import _usuarios from  "./usuarios.js"
import _categorias from  "./categorias.js"
const DataTypes = _sequelize.DataTypes;

export default function initModels(sequelize) {
  const usuarios = _usuarios.init(sequelize, DataTypes)
  const categorias = _categorias.init(sequelize, DataTypes)

  return {
    usuarios,
    categorias
  };
}
