"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("relationships", {
      parent1: {
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
      parent2: {
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
      child: {
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
    await queryInterface.dropTable("relationships");
  },
};
