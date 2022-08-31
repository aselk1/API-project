'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Playlists', [
      {
        name: "Playlist1",
        imageUrl: "image url",
        userId: 1
      },
      {
        name: "Playlist1",
        imageUrl: "image url",
        userId: 2
      },
      {
        name: "Playlist1",
        imageUrl: "image url",
        userId: 3
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete('Playlists', {
      name: { [Op.in]: ['Playlist1', 'Playlist2', 'Playlist3'] }
    }, { // to fix auto increment
      truncate: true,
      cascade: true,
      restartIdentity: true
    });
  }
};
