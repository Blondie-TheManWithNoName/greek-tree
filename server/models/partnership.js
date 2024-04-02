"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Partnership extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Partnership.belongsTo(models.God, {
        as: "God1",
        foreignKey: "god1_id",
      });
      Partnership.belongsTo(models.God, { as: "God2", foreignKey: "god2_id" });

      // Partnership.belongsToMany(models.God, { through: Partnership });
    }
  }

  Partnership.init(
    {
      god1: {
        primaryKey: true,
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: "God",
          key: "name",
        },
      },
      god2: {
        primaryKey: true,
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
      modelName: "Partnership",
      tableName: "partnerships", // Adjust table name as needed
      timestamps: false,
    }
  );

  return Partnership;
};
