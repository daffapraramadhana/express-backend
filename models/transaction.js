'use strict';
const {
  Model, DataTypes
} = require('sequelize');

// connect to database
const sequelize = require('./db-connection'); // Adjust the path to your database connection file

  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Transaction.init({
    box_id: {
      type:DataTypes.INTEGER,
      allowNull:true
    },
    box_location: {
      type:DataTypes.STRING,
      allowNull:true
    },
    collect_time: {
      type:DataTypes.STRING,
      allowNull:true
    },
    store_name: {
      type:DataTypes.STRING,
      allowNull:true
    },
    store_phone_number: {
      type:DataTypes.STRING,
      allowNull:true
    },
    email : {
      type:DataTypes.STRING,
      allowNull:true
    },
    validate_code: {
      type:DataTypes.STRING,
      allowNull:true
    },
    store_time: {
      type:DataTypes.BIGINT,
      allowNull:true
    },
    sync_flag: {
      type:DataTypes.BOOLEAN,
      allowNull:true
    }
  }, {
    sequelize,
    modelName: 'Transactions',
  });
  module.exports = Transaction