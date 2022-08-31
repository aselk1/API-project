'use strict';
const {Model, Validator} = require('sequelize');
const bcrypt = require('bcryptjs');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    toSafeObject() { //create a safe object
      const {id, username, email} = this; //context is the user instance
      return {id, username, email};
    }
    validatePassword(password) { //validate a password
      return bcrypt.compareSync(password, this.hashedPassword.toString());
    }
    static getCurrentUserById(id) { // get the currentUser
      return User.scope("currentUser").findByPk(id);
    };
    static async login({credential, password}) {
      const {Op} = require('sequelize');
      const user = await User.scope('loginUser').findOne({ //find a user with a matching credentials
        where: {
          [Op.or]: {
            username: credential,
            email: credential
          }
        }
      });
      if (user && user.validatePassword(password)) { //if user is found the passwords match, run current user scope query
        return await User.scope('currentUser').findByPk(user.id)
      }
    }
    static async signup({ username, email, password, firstName, lastName }) {
      const hashedPassword = bcrypt.hashSync(password); //create salted/hashed password
      //new error handling for non unique users
      let check = await User.findOne({ where: { username: username } })
      let check2 = await User.findOne({ where: { email: email } })
      if (check || check2) {
        let err = new Error("User already exists")
        err.status = 403;
        err.errors = {};
        if (check) err.errors.username = "User with that username already exists";
        if (check2) err.errors.email = "User with that email already exists";
        throw err
      }
      const user = await User.create({ username, email, hashedPassword, firstName, lastName }); // create new user in table
      return await User.scope('currentUser').findByPk(user.id); // return that new user with the currentUser scope query
    }
    static associate(models) {
      // define association here
      User.hasMany(models.Album, {foreignKey: 'userId'});
      User.hasMany(models.Playlist, { foreignKey: 'userId' });
      User.hasMany(models.Song, { foreignKey: 'userId'});
      User.hasMany(models.Comment, { foreignKey: 'userId' });
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4, 30],
        isNotEmail(value) {
          if (Validator.isEmail(value)) {
            throw new Error("Cannot be an email.")
          }
        }
      }
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull:false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3,256],
        isEmail: true
      }
    },
    hashedPassword: {
      type: DataTypes.STRING.BINARY,
      allowNull: false,
      validate: {
        len: [60, 60]
      }
    },
    imageUrl: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'User',
    defaultScope: {
      attributes: {
        exclude: ["hashedPassword", "email", "createdAt", "updatedAt"]
      }
    },
    scopes: {
      currentUser: {
        attributes: {exclude: ["hashedPassword","createdAt","updatedAt","imageUrl"]}
      },
      loginUser: {attributes: {}}
    }
  });
  return User;
};
