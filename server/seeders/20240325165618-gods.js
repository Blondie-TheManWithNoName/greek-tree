"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // Insert gods
    await queryInterface.bulkInsert(
      "gods",
      [
        // { name: "Bellerophontes", gender: false },
        // { name: "Glaukos", gender: false },
        // { name: "Sisyphos", gender: false },
        // { name: "Merope", gender: true },
        // { name: "Eurynome", gender: true },
        // { name: "Polyneikes", gender: false },
        // { name: "Argeia", gender: true },
        // { name: "Thersandros", gender: false },
        // { name: "Teisamenos", gender: false },
        // { name: "Europa", gender: true },
        // { name: "Agenor", gender: false },
        // { name: "Telephassa", gender: true },
        // { name: "Ödipus", gender: false },
        // { name: "Iokaste", gender: true },
        // { name: "Laios", gender: false },
        // { name: "Kadmos", gender: false },
        // { name: "Kilix", gender: false },
        // { name: "Phoinix", gender: false },
        // { name: "Harmonia", gender: true },
        // { name: "Agaue", gender: true },
        // { name: "Polydoros", gender: false },
        // { name: "Autonoë", gender: true },
        // { name: "Ino", gender: true },
        // { name: "Semele", gender: true },
        // { name: "Dionysos", gender: false },
        // { name: "Echion", gender: false },
        // { name: "Pentheus", gender: false },
        // { name: "Xuthos", gender: false },
        // { name: "Krëusa", gender: true },
        // { name: "Ion", gender: false },
        // { name: "Apollon", gender: false },
        // { name: "Daidalos", gender: false },
        // { name: "Ikarus", gender: false },
        // { name: "Aktaion", gender: false },
        // { name: "Aristaios", gender: false },
        // { name: "Aiakos", gender: false },
        // { name: "Endeïs", gender: true },
        // { name: "Psamathe", gender: true },
        // { name: "Aigina", gender: true },
        // { name: "Phokos", gender: false },
        // { name: "Peleus", gender: false },
        // { name: "Telamon", gender: false },
        // { name: "Herse", gender: true },
        // { name: "Hermes", gender: false },
        // { name: "Kephalos", gender: false },
        // { name: "Prokris", gender: true },
        // { name: "Erechtheus", gender: false },
        // { name: "Praxithea", gender: true },
        // { name: "Aias", gender: false },
        // { name: "Achilleus", gender: false },
        // { name: "Thetis", gender: true },
        // { name: "Tantalos", gender: false },
        // { name: "Pluto", gender: true },
        // { name: "Hedone", gender: true },
        // { name: "Psyche", gender: true },
        // { name: "Eros", gender: false },
        // { name: "Aphrodite", gender: true },
        // { name: "Ares", gender: false },
        // { name: "Dione", gender: true },

        // { name: "Uranos", gender: false },
        // { name: "Gaia", gender: true },
        // { name: "Leto", gender: true },
        // { name: "Teiresias", gender: false },
        // { name: "Manto", gender: true },
        // { name: "Rhakios", gender: false },
        // { name: "Amphion", gender: false },
        // { name: "Ismenos", gender: false },
        // { name: "Siphlos", gender: false },
        // { name: "Phaidimos", gender: false },
        // { name: "Alphenor", gender: false },
        // { name: "Damasichthon", gender: false },
        // { name: "Ilioneus", gender: false },
        // { name: "Niobe", gender: true },
        // { name: "Hermothoe", gender: true },
        // { name: "Pandareos", gender: false },
        // { name: "Aëdon", gender: true },
        // { name: "Zethos", gender: false },
        // { name: "Itylos", gender: false },
        // { name: "Leda", gender: true },
        // { name: "Tyndareos", gender: false },
        // { name: "Kastor", gender: false },
        // { name: "Polydeukes", gender: false },
        // { name: "Arene", gender: true },
        // { name: "Aphareus", gender: false },
        // { name: "Lynkeus", gender: false },
        // { name: "Idas", gender: false },
        // { name: "Asterope", gender: true },
        // { name: "Oinomaos", gender: false },
        // { name: "Alkippe", gender: true },
        // { name: "Euenos", gender: false },
        // { name: "Marpessa", gender: true },
        // { name: "Hippodameia", gender: true },
        // { name: "Alkmene", gender: true },
        // { name: "Amphytrion", gender: false },
        // { name: "Iphikles", gender: false },
        // { name: "Herakles", gender: false },
        // { name: "Megara", gender: true },
        // { name: "Kreon", gender: false },
        // { name: "Helios", gender: false },
        // { name: "Augias", gender: false },
        // { name: "Phyleus", gender: false },
        // { name: "Chloris", gender: true },
        // { name: "Neleus", gender: false },
        // { name: "Periklymenos", gender: false },
        // { name: "Nestor", gender: false },
        // { name: "Eurytos", gender: false },
        // { name: "Iole", gender: true },
        // { name: "Iphitos", gender: false },
        // { name: "Hesione", gender: true },
        // { name: "Teukros", gender: false },
        // { name: "Laomedon", gender: false },
        // { name: "Podarkes", gender: false },
        // { name: "Syleus", gender: false },
        // { name: "Xenodoke", gender: true },
        // { name: "Deïaneira", gender: true },
        // { name: "Hyllos", gender: false },
        // { name: "Makaria", gender: true },
        // { name: "Hebe", gender: true },
        // { name: "Aniketos", gender: false },
        // { name: "Alexiares", gender: false },
        // { name: "Midas", gender: false },
        // { name: "Lytierses", gender: false },
        // { name: "Iolaos", gender: false },
        // { name: "Leipephile", gender: true },
        // { name: "Pelias", gender: false },
        // { name: "Alkestis", gender: true },
        // { name: "Admetos", gender: false },
        // { name: "Oikles", gender: false },
        // { name: "Amphiaraos", gender: false },
        // { name: "Kerkyon", gender: false },
        // { name: "Alope", gender: true },
        // { name: "Hippothoon", gender: false },
        // { name: "Minos", gender: false },
        // { name: "Phaidra", gender: true },
        // { name: "Androgeos", gender: false },
        // { name: "Ariadne", gender: true },
        // { name: "Pasiphae", gender: true },
        // { name: "Pittheus", gender: false },
        // { name: "Aithra", gender: true },
        // { name: "Aigeus", gender: false },
        // { name: "Theseus", gender: false },
        // { name: "Antiope", gender: true },
        // { name: "Hippolytos", gender: false },
        // { name: "Phoibe", gender: true },
        // { name: "Koios", gender: false },

        { name: "Rhea", gender: true },
        { name: "Kronos", gender: false },

        { name: "Hestia", gender: true },
        { name: "Demeter", gender: true },
        { name: "Hera", gender: true },
        { name: "Hades", gender: true },
        { name: "Poseidon", gender: false },
        { name: "Zeus", gender: false },

        { name: "Iasion", gender: false },
        { name: "Elektra", gender: true },
        { name: "Carmanor", gender: false },

        { name: "Persephone", gender: false },
        { name: "Plutus", gender: false },
        { name: "Philomelus", gender: false },
      ],
      {
        ignoreDuplicates: true, // Specify the ignoreDuplicates option
      }
    );

    // const godIds = insertedGods.map((god) => god.god);

    // Insert partnerships
    await queryInterface.bulkInsert(
      "partnerships",
      [
        { god1: "Kronos", god2: "Rhea" },

        { god1: "Demeter", god2: "Zeus" },
        { god1: "Demeter", god2: "Poseidon" },
        { god1: "Demeter", god2: "Iasion" },
        { god1: "Demeter", god2: "Carmanor" },

        { god1: "Elektra", god2: "Zeus" },
      ],
      {
        ignoreDuplicates: true, // Specify the ignoreDuplicates option
      }
    );

    // Insert parent-child relationships
    await queryInterface.bulkInsert(
      "relationships",
      [
        { parent1: "Kronos", parent2: "Rhea", child: "Hestia" },
        { parent1: "Kronos", parent2: "Rhea", child: "Demeter" },
        { parent1: "Kronos", parent2: "Rhea", child: "Hera" },
        { parent1: "Kronos", parent2: "Rhea", child: "Hades" },
        { parent1: "Kronos", parent2: "Rhea", child: "Poseidon" },
        { parent1: "Kronos", parent2: "Rhea", child: "Zeus" },

        { parent1: "Demeter", parent2: "Zeus", child: "Persephone" },
        { parent1: "Demeter", parent2: "Iasion", child: "Plutus" },
        { parent1: "Demeter", parent2: "Iasion", child: "Philomelus" },

        { parent1: "Zeus", parent2: "Elektra", child: "Iasion" },
        // Add more relationships as needed
      ],
      {
        ignoreDuplicates: true, // Specify the ignoreDuplicates option
      }
    );
  },

  async down(queryInterface, Sequelize) {
    // Delete relationships
    await queryInterface.bulkDelete("relationships", null, {});

    // Delete partnerships
    await queryInterface.bulkDelete("partnerships", null, {});

    // Delete gods
    await queryInterface.bulkDelete("gods", null, {});
  },
};
