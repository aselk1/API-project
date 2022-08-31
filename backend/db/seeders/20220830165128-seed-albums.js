'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Albums', [
      {
        userId: 1,
        title: "Album1",
        description: "This is an album of songs.",
        imageUrl: null
      },
      {
        userId: 2,
        title: "Album2",
        description: "This is an album of songs.",
        imageUrl: null
      },
      // {
      //   userId: 3,
      //   title: "Album3",
      //   description: "This is an album of songs.",
      //   imageUrl: null
      // }
    ], {})
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete('Albums', {
     title : { [Op.in]: ['Album1', 'Album2', 'Album3'] }
    }, { // truncate to reset autoincrement id
      truncate: true,
      cascade: true,
      restartIdentity: true
    });
  }
};
