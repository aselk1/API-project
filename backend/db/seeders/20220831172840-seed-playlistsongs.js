'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('PlaylistSongs', [
      {
        songId: 1,
        playlistId: 1
      },
      {
        songId: 2,
        playlistId: 1
      },
      {
        songId: 3,
        playlistId: 1
      },
      {
        songId: 4,
        playlistId: 1
      },
      {
        songId: 1,
        playlistId: 2
      },
      {
        songId: 2,
        playlistId: 2
      },
      {
        songId: 3,
        playlistId: 2
      },
      {
        songId: 4,
        playlistId: 2
      },
      {
        songId: 1,
        playlistId: 3
      },
      {
        songId: 2,
        playlistId: 3
      },
      {
        songId: 3,
        playlistId: 3
      },
      {
        songId: 4,
        playlistId: 3
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete('PlaylistSongs', {
        [Op.and]: [{
          songId: { [Op.in]: [1, 2, 3, 4] }
        }, {
          playlistId: { [Op.in]: [1, 2, 3] }
        }]
    }, { // to fix auto increment
      truncate: true,
      cascade: true,
      restartIdentity: true
    });
  }
};
