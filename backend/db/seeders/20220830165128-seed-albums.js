'use strict';

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = "Albums";
    return await queryInterface.bulkInsert(options, [
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
      {
        userId: 3,
        title: "Album3",
        description: "This is an album of songs.",
        imageUrl: null
      }
    ], {})
  },

  async down (queryInterface, Sequelize) {
    options.tableName = "Albums";
    const Op = Sequelize.Op;
    return await queryInterface.bulkDelete(options, {
     title : { [Op.in]: ['Album1', 'Album2', 'Album3'] }
    }, { // truncate to reset autoincrement id
      truncate: true,
      cascade: true,
      restartIdentity: true
    });
  }
};
