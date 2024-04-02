const gods = require("express").Router();
const { God, Partnership, Relationship } = require("../models");
const { Op } = require("sequelize");

// const Partnership = require("../models/partnership");
// const Relationship = require("../models/relationship");
// const { God } = db;

// Get all Gods

gods.get("/", async (req, res) => {
  try {
    // Using Sequelize's findAll method to fetch all gods
    const foundGods = await God.findAll();
    res.status(200).json(foundGods);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
});

gods.get("/:parent1&parent2", async (req, res) => {
  const parent1 = req.params.parent1;
  const parent2 = req.params.parent2;

  const children = await Relationship.findAll({
    attributes: ["child_id"], // Specify the attributes you want to retrieve
    where: {
      parent_id: parent1.god_id,
    },
  });

  const childrenNames = await Promise.all(
    children.map(async (child) => {
      const childGod = await God.findOne({
        attributes: ["name"],
        where: { god_id: child.child_id },
      });
      return childGod ? childGod.name : null;
    })
  );
  return res.status(200).json({
    god: god.name,
    parentsNames,
    partners: partnerNames,
  });
});

gods.get("/:name", async (req, res) => {
  // const godName = req.params.name;
  // try {
  //   const foundGod = await God.findOne({
  //     attributes: ["name"],
  //     where: { name: godName },
  //     include: [
  //       {
  //         model: God,
  //         as: "Partner",
  //         attributes: ["name"], // Specify only the "name" attribute
  //       },
  //       {
  //         model: God,
  //         as: "Partner2",
  //         attributes: ["name"], // Specify only the "name" attribute
  //       },
  //     ],
  //   });
  //   if (foundGod) {
  //     res.status(200).json(foundGod);
  //   } else {
  //     res.status(404).json({ error: "God not found" });
  //   }
  // } catch (err) {
  //   console.error(err);
  //   res.status(500).json({ error: "Server Error" });
  // }

  const godName = req.params.name;
  const god = await God.findOne({
    attributes: ["name", "god_id"],
    where: { name: godName },
  });

  if (!god) {
    return res.status(404).json({ error: "God not found" });
  }

  // Query to get the names of the partners
  const partners = await Partnership.findAll({
    attributes: ["god1_id", "god2_id"], // Specify the attributes you want to retrieve
    where: {
      [Op.or]: [{ god1_id: god.god_id }, { god2_id: god.god_id }],
    },
  });

  const partnerNames = await Promise.all(
    partners.map(async (partner) => {
      if (partner.god1_id === god.god_id) {
        const partnerGod = await God.findOne({
          attributes: ["name"],
          where: { god_id: partner.god2_id },
        });
        return partnerGod ? partnerGod.name : null;
      } else {
        const partnerGod = await God.findOne({
          attributes: ["name"],
          where: { god_id: partner.god1_id },
        });
        return partnerGod ? partnerGod.name : null;
      }
    })
  );

  // const children = await Relationship.findAll({
  //   attributes: ["child_id"], // Specify the attributes you want to retrieve
  //   where: {
  //     parent_id: god.god_id,
  //   },
  // });

  // const childrenNames = await Promise.all(
  //   children.map(async (child) => {
  //     const childGod = await God.findOne({
  //       attributes: ["name"],
  //       where: { god_id: child.child_id },
  //     });
  //     return childGod ? childGod.name : null;
  //   })
  // );

  const parents = await Relationship.findAll({
    attributes: ["parent_id"], // Specify the attributes you want to retrieve
    where: {
      child_id: god.god_id,
    },
  });

  const parentsNames = await Promise.all(
    parents.map(async (parent) => {
      const parentGod = await God.findOne({
        attributes: ["name"],
        where: { god_id: parent.parent_id },
      });
      return parentGod ? parentGod.name : null;
    })
  );

  return res.status(200).json({
    god: god.name,
    parentsNames,
    partners: partnerNames,
  });
});

module.exports = gods;
