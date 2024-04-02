"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("gods", {
      name: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
      },
      greek_name: {
        type: Sequelize.STRING,
      },
      roman_name: {
        type: Sequelize.STRING,
      },
      translation_name: {
        type: Sequelize.STRING,
      },
      gender: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
      },
      father: {
        type: Sequelize.STRING,
        references: {
          model: "gods",
          key: "name",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      mother: {
        type: Sequelize.STRING,
        references: {
          model: "gods",
          key: "name",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
    });

    // Add foreign key constraints for partnerships and relationships
    await queryInterface.addConstraint("gods", {
      fields: ["father"],
      type: "foreign key",
      name: "fk_gods_father",
      references: {
        table: "gods",
        field: "name",
      },
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
    });

    await queryInterface.addConstraint("gods", {
      fields: ["mother"],
      type: "foreign key",
      name: "fk_gods_mother",
      references: {
        table: "gods",
        field: "name",
      },
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Drop the foreign key constraints first
    await queryInterface.removeConstraint("gods", "fk_gods_mother");
    await queryInterface.removeConstraint("gods", "fk_gods_father");

    // Then drop the table
    await queryInterface.dropTable("gods");
  },
};
