'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      box_id: {
        type: Sequelize.INTEGER
      },
      box_location: {
        type: Sequelize.STRING
      },
      collect_time: {
        type: Sequelize.BIGINT
      },
      store_name: {
        type: Sequelize.STRING
      },
      store_phone_number: {
        type: Sequelize.STRING
      },
      validate_code: {
        type: Sequelize.STRING
      },
      store_time: {
        type: Sequelize.BIGINT
      },
      sync_flag: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Transactions');
  }
};