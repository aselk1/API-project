'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Comments", [
      {
        userId: 1,
        songId: 1,
        body: "this is a comment"
      },
      {
        userId: 1,
        songId: 2,
        body: "this is a comment"
      }, {
        userId: 1,
        songId: 3,
        body: "this is a comment"
      }, {
        userId: 1,
        songId: 4,
        body: "this is a comment"
      }, {
        userId: 2,
        songId: 1,
        body: "this is a comment"
      },
      {
        userId: 2,
        songId: 2,
        body: "this is a comment"
      }, {
        userId: 2,
        songId: 3,
        body: "this is a comment"
      }, {
        userId: 2,
        songId: 4,
        body: "this is a comment"
      }, {
        userId: 3,
        songId: 1,
        body: "this is a comment"
      },
      {
        userId: 3,
        songId: 2,
        body: "this is a comment"
      }, {
        userId: 3,
        songId: 3,
        body: "this is a comment"
      }, {
        userId: 3,
        songId: 4,
        body: "this is a comment"
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete('Comments', {
      [Op.and]: [{
        songId: { [Op.in]: [1, 2, 3, 4] }
      }, {
        userId: { [Op.in]: [1, 2, 3] }
      }]
    }, { // to fix auto increment
      truncate: true,
      cascade: true,
      restartIdentity: true
    });
  }
};
