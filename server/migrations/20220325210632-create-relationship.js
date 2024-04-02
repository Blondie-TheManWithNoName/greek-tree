"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("partnerships", {
      god1: {
        primaryKey: true,
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: "gods",
          key: "name",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      god2: {
        primaryKey: true,
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: "gods",
          key: "name",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("partnerships");
  },
};
