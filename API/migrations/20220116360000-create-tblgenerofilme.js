'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tblgenerosfilmes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      apagado: {
        type: Sequelize.INTEGER,
        defaultValue:0
      },
      tblgeneroId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'tblgeneros',
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
    await queryInterface.dropTable('tblgenerosfilmes');
  }
};