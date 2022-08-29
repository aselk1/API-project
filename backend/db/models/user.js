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
    static async signup({username, email, password}) {
      const hashedPassword = bcrypt.hashSync(password); //create salted/hashed password
      const user = await User.create({username, email, hashedPassword}); // create new user in table
      return await User.scope('currentUser').findByPk(user.id); // return that new user with the currentUser scope query
    }
    static associate(models) {
      // define association here
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
        attributes: {exclude: ["hashedPassword"]}
      },
      loginUser: {attributes: {}}
    }
  });
  return User;
};
