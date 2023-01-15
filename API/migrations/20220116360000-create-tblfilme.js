'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tblfilmes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nome: {
        type: Sequelize.STRING
      },
      descricao: {
        type: Sequelize.TEXT
      },
      genero: {
        type: Sequelize.STRING
      },
      autor: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING
      },
      apagado: {
        type: Sequelize.INTEGER,
        defaultValue:0
      },
      tblusuarioId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'tblusuarios',
          key: 'id',
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('tblfilmes');
  }
};