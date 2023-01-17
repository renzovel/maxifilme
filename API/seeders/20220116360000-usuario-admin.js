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
      senha:'$2b$10$DcHnTaKUNtFR2oMojfa0/eituUyQmf4iedQi6RcgiMBcBJpJPzCyC',
      confirmado:1,
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
