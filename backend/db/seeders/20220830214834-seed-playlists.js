'use strict';

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = "Playlists";
    return await queryInterface.bulkInsert(options, [
      {
        name: "Playlist1",
        imageUrl:
          "https://livelystudio.fr/uploads/images/cover%20square_Plan%20de%20travail%201%20copie%206.jpg",
        userId: 1,
      },
      {
        name: "Playlist1",
        imageUrl:
          "https://images.squarespace-cdn.com/content/v1/60cf6ad9bb74ae19ebb4b849/f117179a-bcfb-49db-9418-f35a1da66fa5/1000x1000+rick+springfield+richard+marx+teaser+square.jpg",
        userId: 2,
      },
      {
        name: "Playlist1",
        imageUrl:
          "https://images.8tracks.com/cover/i/000/222/224/Jazz_2B-_2BCuban_2BStyle_2B24x36_2BKaren_2BSloan-6004.jpg?rect=0,98,490,490&q=98&fm=jpg",
        userId: 3,
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    options.tableName = "Playlists";
    const Op = Sequelize.Op;
    return await queryInterface.bulkDelete(options, {
      name: { [Op.in]: ['Playlist1', 'Playlist2', 'Playlist3'] }
    }, { // to fix auto increment
      truncate: true,
      cascade: true,
      restartIdentity: true
    });
  }
};
