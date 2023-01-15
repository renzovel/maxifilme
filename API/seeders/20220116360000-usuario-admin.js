'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('tblusuarios', [{
      id:1,
      nome:'RENZO ',
      email:'admin@maxifilme.com',
      senha:'$2b$10$Qh2LUcXb4fClQck7Umbr4uiSbIgpuy9JmOX370Gj3xrCD01/Uu1pO',
      confirmado:1,
      datan:'01/01/1999',
      foto:null,
      nivel:1,
      token:null,
      apagado:0,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('tblusuarios', null, {});
     */
    await queryInterface.bulkDelete('tblusuarios', null, {});
  }
};
