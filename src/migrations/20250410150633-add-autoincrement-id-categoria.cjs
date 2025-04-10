'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('categorias', 'id', {
      type: Sequelize.UUID,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('categorias', 'id', {
      type: Sequelize.UUID,
      allowNull: false,
      defaultValue: null,
      primaryKey: true
    });
  }
};
