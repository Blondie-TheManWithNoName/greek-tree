"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Relationship extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // No associations needed for the Relationship model
      Relationship.belongsTo(models.God, {
        foreignKey: "parent1",
        as: "Parent1",
      });

      Relationship.belongsTo(models.God, {
        foreignKey: "parent2",
        as: "Parent2",
      });

      // Association with Child
      Relationship.belongsTo(models.God, {
        foreignKey: "child",
        as: "Child",
      });
    }
  }

  Relationship.init(
    {
      parent1: {
        primaryKey: true,
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: "God",
          key: "name",
        },
      },
      parent2: {
        primaryKey: true,
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: "God",
          key: "name",
        },
      },
      child: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: "God",
          key: "name",
        },
      },
    },
    {
      sequelize,
      modelName: "Relationship",
      tableName: "relationships", // Adjust table name as needed
      timestamps: false,
    }
  );

  return Relationship;
};
