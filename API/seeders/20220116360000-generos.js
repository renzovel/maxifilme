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
    await queryInterface.bulkInsert('tblgeneros', [{
        id:1,
        nome: 'Ação',
        apagado: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:2,
        nome: 'Aventura',
        apagado: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:3,
        nome: 'Cinema de arte',
        apagado: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:4,
        nome: 'Chanchada',
        apagado: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:5,
        nome: 'Comédia',
        apagado: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:6,
        nome: 'Comédia de ação',
        apagado: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:7,
        nome: 'Comédia de terror',
        apagado: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:8,
        nome: 'Comédia dramática',
        apagado: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:9,
        nome: 'Comédia romântica',
        apagado: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:10,
        nome: 'Dança',
        apagado: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:11,
        nome: 'Documentário',
        apagado: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:12,
        nome: 'Docuficção',
        apagado: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:13,
        nome: 'Drama',
        apagado: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:14,
        nome: 'Espionagem',
        apagado: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:15,
        nome: 'Faroeste',
        apagado: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:16,
        nome: 'Fantasia',
        apagado: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:17,
        nome: 'Fantasia científica',
        apagado: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:18,
        nome: 'Ficção científica',
        apagado: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:19,
        nome: 'Filmes com truques',
        apagado: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:20,
        nome: 'Filmes de guerra',
        apagado: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:21,
        nome: 'Mistério',
        apagado: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:22,
        nome: 'Musical',
        apagado: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:23,
        nome: 'Filme policial',
        apagado: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:24,
        nome: 'Romance',
        apagado: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:25,
        nome: 'Terror',
        apagado: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:26,
        nome: 'Thriller',
        apagado: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('tblgeneros', null, {});
     */
    await queryInterface.bulkDelete('tblgeneros', null, {});
  }
};