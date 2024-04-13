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
gods.get("/parents/:name", async (req, res) => {
  try {
    const godName = req.params.name;

    const parents = await Relationship.findAll({
      attributes: ["parent1", "parent2"], // Specify the attributes you want to retrieve
      where: {
        child: godName,
      },
    });

    return res.status(200).json(parents);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

gods.get("/children/:p1&:p2", async (req, res) => {
  try {
    const parent1 = req.params.p1;
    const parent2 = req.params.p2;

    console.log("parent1", parent1);
    console.log("parent2", parent2);

    if (!parent1 || !parent2) {
      return res
        .status(400)
        .json({ error: "Both parent1 and parent2 parameters are required" });
    }

    const children = await Relationship.findAll({
      attributes: ["child"], // Specify the attributes you want to retrieve
      where: {
        [Op.or]: [
          {
            [Op.and]: [{ parent1: parent1 }, { parent2: parent2 }],
          },
          {
            [Op.and]: [{ parent1: parent2 }, { parent2: parent1 }],
          },
        ],
      },
    });

    const childrenNames = children.map((child) => child.child);

    // const childrenNames = await Promise.all(
    //   children.map(async (child) => {
    //     const childGod = await God.findOne({
    //       attributes: ["name"],
    //       where: { god_id: child.child_id },
    //     });
    //     return childGod ? childGod.name : null;
    //   })
    // );
    return res.status(200).json(childrenNames);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

gods.get("/:name", async (req, res) => {
  const godName = req.params.name;
  const god = await God.findOne({
    attributes: [
      "name",
      "greek_name",
      "roman_name",
      "translation_name",
      "gender",
      "description",
    ],
    where: { name: godName },
  });

  if (!god) {
    return res.status(404).json({ error: "God not found" });
  }

  // Query to get the names of the partners
  const partners = await Partnership.findAll({
    attributes: ["god1", "god2"], // Specify the attributes you want to retrieve
    where: {
      [Op.or]: [{ god1: god.name }, { god2: god.name }],
    },
  });

  const partnerNames = partners.map((partner) => {
    if (partner.god1 === godName) {
      return partner.god2;
    } else {
      return partner.god1;
    }
  });

  // const partnerNames = await Promise.all(
  //   partners.map(async (partner) => {
  //     if (partner.god1 === god.god2) {
  //       const partnerGod = await God.findOne({
  //         attributes: ["name"],
  //         where: { god: partner.god2 },
  //       });
  //       return partnerGod ? partnerGod.name : null;
  //     } else {
  //       const partnerGod = await God.findOne({
  //         attributes: ["name"],
  //         where: { god: partner.god1 },
  //       });
  //       return partnerGod ? partnerGod.name : null;
  //     }
  //   })
  // );

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

  // const parents = await Relationship.findAll({
  //   attributes: ["parent_id"], // Specify the attributes you want to retrieve
  //   where: {
  //     child_id: god.god_id,
  //   },
  // });

  // const parentsNames = await Promise.all(
  //   parents.map(async (parent) => {
  //     const parentGod = await God.findOne({
  //       attributes: ["name"],
  //       where: { god_id: parent.parent_id },
  //     });
  //     return parentGod ? parentGod.name : null;
  //   })
  // );

  return res.status(200).json({
    god: god,
    // parentsNames,
    partners: partnerNames,
  });
});

module.exports = gods;
