'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tblvotos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      puntuacao: {
        type: Sequelize.INTEGER
      },
      comentario: {
        type: Sequelize.TEXT
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
      tblfilmeId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'tblfilmes',
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
    await queryInterface.dropTable('tblvotos');
  }
};