'use strict';
const {
  Model, DataTypes
} = require('sequelize');

// connect to database
const sequelize = require('./db-connection'); // Adjust the path to your database connection file

class Box extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // define association here
  }
}
Box.init({
  box_size: {
    type:DataTypes.STRING,
    allowNull:true
  },
  box_number: {
    type:DataTypes.STRING,
    allowNull:true
  }, 
  status:{
    type:DataTypes.BOOLEAN, 
    allowNull:true
  }
}, {
  sequelize,
  modelName: 'Box',
});
module.exports = Box
