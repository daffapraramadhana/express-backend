const { Sequelize } = require('sequelize');

// Create a Sequelize instance with the desired configuration
const sequelize = new Sequelize("sqlite:./database3.sqlite");

module.exports = sequelize; //