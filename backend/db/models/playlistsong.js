'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PlaylistSong extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PlaylistSong.belongsTo(models.Playlist, {foreignKey: 'playlistId'});
      PlaylistSong.belongsTo(models.Song, { foreignKey: 'songId' });
    }
  }
  PlaylistSong.init({
    id: { // needed in models with more than one foreign key.
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    songId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    playlistId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    order: {
      type: DataTypes.INTEGER
    },
  }, {
    sequelize,
    modelName: 'PlaylistSong',
    defaultScope: {
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      }
    }
  });
  return PlaylistSong;
};
