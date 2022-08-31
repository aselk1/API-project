'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Songs', [
      {
        albumId: 1,
        userId: 1,
        title: "Song1",
        description: "This is a song.",
        url: "audio url",
        imageUrl: "image url"
      },
      {
        albumId: 1,
        userId: 1,
        title: "Song2",
        description: "This is a song.",
        url: "audio url",
        imageUrl: "image url"
      },
      {
        albumId: 2,
        userId: 2,
        title: "Song3",
        description: "This is a song.",
        url: "audio url",
        imageUrl: "image url"
      },
      {
        albumId: 2,
        userId: 2,
        title: "Song4",
        description: "This is a song.",
        url: "audio url",
        imageUrl: "image url"
      }
    ], {})
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete('Songs', {
      title: { [Op.in]: ['Song1', 'Song2', 'Song3', 'Song4'] }
    }, { // to fix auto increment
      truncate: true,
      cascade: true,
      restartIdentity: true
    });
  }
};
