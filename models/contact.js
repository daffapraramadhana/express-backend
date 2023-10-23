'use strict';
const {
  Model, DataTypes
} = require('sequelize');

// connect to database
const sequelize = require('./db-connection'); // Adjust the path to your database connection file

class Contact extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Contact.init({
    firstName: {
      type:DataTypes.STRING,
      allowNull: true
    },
    lastName: {
      type:DataTypes.STRING,
      allowNull: true
    },
    phone: {
      type:DataTypes.STRING,
      allowNull: true
    },
    email: {
      type:DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Contact',
  }
  );

  module.exports = Contact