'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('categorias', 'user_id', {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: 'usuarios',
        key: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('categorias', 'user_id');
  }
};
