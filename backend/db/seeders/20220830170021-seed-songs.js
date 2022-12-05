"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = "Songs";
    return await queryInterface.bulkInsert(
      options,
      [
        {
          albumId: 1,
          userId: 1,
          title: "Dreams",
          description: "Electro music",
          url: "https://www.bensound.com/bensound-music/bensound-dreams.mp3",
          imageUrl: "https://cdn.bensound.com/image/cover/dreams-thumbX2.jpg",
        },
        {
          albumId: 1,
          userId: 1,
          title: "All That",
          description: "Hop",
          url: "https://www.bensound.com/bensound-music/bensound-allthat.mp3",
          imageUrl: "https://cdn.bensound.com/image/cover/allthat-thumbX2.jpg",
        },
        {
          albumId: 1,
          userId: 1,
          title: "Ukulele",
          description: "Happy and Light",
          url: "https://www.bensound.com/bensound-music/bensound-ukulele.mp3",
          imageUrl: "https://cdn.bensound.com/image/cover/ukulele-thumbX2.jpg",
        },
        {
          albumId: 1,
          userId: 1,
          title: "Jazzy Frenchy",
          description: "Gypsy french jazz",
          url: "https://www.bensound.com/bensound-music/bensound-jazzyfrenchy.mp3",
          imageUrl:
            "https://cdn.bensound.com/image/cover/jazzyfrenchy-thumbX2.jpg",
        },
        {
          albumId: 2,
          userId: 2,
          title: "Creative Minds",
          description: "Inspiring",
          url: "https://www.bensound.com/bensound-music/bensound-creativeminds.mp3",
          imageUrl:
            "https://cdn.bensound.com/image/cover/creativeminds-thumbX2.jpg",
        },
        {
          albumId: 2,
          userId: 2,
          title: "Hey!",
          description: "Cheerful",
          url: "https://www.bensound.com/bensound-music/bensound-hey.mp3",
          imageUrl: "https://cdn.bensound.com/image/cover/hey-thumbX2.jpg",
        },
        {
          albumId: 2,
          userId: 2,
          title: "Once Again",
          description: "Love",
          url: "https://www.bensound.com/bensound-music/bensound-onceagain.mp3",
          imageUrl:
            "https://cdn.bensound.com/image/cover/onceagain-thumbX2.jpg",
        },
        {
          albumId: 2,
          userId: 2,
          title: "Elevate",
          description: "Motivational",
          url: "https://www.bensound.com/bensound-music/bensound-elevate.mp3",
          imageUrl: "https://cdn.bensound.com/image/cover/elevate-thumbX2.jpg",
        },
        {
          albumId: 3,
          userId: 3,
          title: "Evolution",
          description: "Adventure",
          url: "https://www.bensound.com/bensound-music/bensound-evolution.mp3",
          imageUrl:
            "https://cdn.bensound.com/image/cover/evolution-thumbX2.jpg",
        },
        {
          albumId: 3,
          userId: 3,
          title: "Inspire",
          description: "Inspiring",
          url: "https://www.bensound.com/bensound-music/bensound-inspire.mp3",
          imageUrl: "https://cdn.bensound.com/image/cover/inspire-thumbX2.jpg",
        },
        {
          albumId: 3,
          userId: 3,
          title: "Fun Day",
          description: "Retro Hop",
          url: "https://www.bensound.com/bensound-music/bensound-funday.mp3",
          imageUrl: "https://cdn.bensound.com/image/cover/funday-thumbX2.jpg",
        },
        {
          albumId: 3,
          userId: 3,
          title: "Happy Rock",
          description: "Uplifting",
          url: "https://www.bensound.com/bensound-music/bensound-happyrock.mp3",
          imageUrl:
            "https://cdn.bensound.com/image/cover/happyrock-thumbX2.jpg",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Songs";
    const Op = Sequelize.Op;
    return await queryInterface.bulkDelete(
      options,
      {
        title: { [Op.in]: ["Song1", "Song2", "Song3", "Song4"] },
      },
      {
        // to fix auto increment
        truncate: true,
        cascade: true,
        restartIdentity: true,
      }
    );
  },
};
