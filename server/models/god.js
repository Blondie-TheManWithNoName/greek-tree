"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class God extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Association with Partner
      // God.belongsTo(God, { foreignKey: "partner_id", as: "Partner" });
      God.belongsToMany(models.God, {
        through: models.Partnership,
        as: "Partner",
        foreignKey: "god1",
      });
      God.belongsToMany(models.God, {
        through: models.Partnership,
        as: "Partner2",
        foreignKey: "god2",
      });

      // Association with Children
      God.belongsToMany(models.God, {
        through: models.Relationship,
        as: "Child",
        foreignKey: "parent_id",
        otherKey: "child_id",
      });

      // Reverse association with Parent (for Child)
      God.belongsToMany(models.God, {
        through: models.Relationship,
        as: "Parent",
        foreignKey: "child_id",
        otherKey: "parent_id",
      });
    }
  }

  God.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        primaryKey: true,
      },
      greek_name: { type: DataTypes.STRING },
      roman_name: { type: DataTypes.STRING },
      translation_name: { type: DataTypes.STRING },
      gender: { type: DataTypes.BOOLEAN, allowNull: false },
      description: { type: DataTypes.TEXT },
      father_id: DataTypes.STRING,
      mother_id: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "God",
      tableName: "gods",
      timestamps: false,
    }
  );

  return God;
};
