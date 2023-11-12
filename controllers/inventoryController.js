const Inventory = require("../models/inventoryModel");

const inventoryController = {
  // Create a new inventory
  createInventory: async (req, res) => {
    try {
      const { location, hospitalId } = req.body;

      // Create a new inventory
      const newInventory = new Inventory({
        location,
        hospital: hospitalId, // Associate with a hospital by its ID
      });

      // Save the new inventory in the database
      await newInventory.save();

      res
        .status(201)
        .json({ message: "Inventory created successfully", newInventory });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to create inventory" });
    }
  },

  // Read a specific inventory by ID
  getInventory: async (req, res) => {
    try {
      const { inventoryId } = req.params;
      const inventory = await Inventory.findById(inventoryId);

      if (!inventory) {
        return res.status(404).json({ message: "Inventory not found" });
      }

      res.status(200).json(inventory);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to retrieve inventory" });
    }
  },

  // Add a donor to the inventory
  addDonorToInventory: async (req, res) => {
    try {
      const { inventoryId, donorId } = req.body;
      const inventory = await Inventory.findById(inventoryId);

      if (!inventory) {
        return res.status(404).json({ message: "Inventory not found" });
      }

      // Add the donor to the inventory's donor array
      inventory.donor.push(donorId);
      await inventory.save();

      res.status(200).json({ message: "Donor added to the inventory" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to add donor to the inventory" });
    }
  },

  // Add a blood sample to the inventory
  addBloodSampleToInventory: async (req, res) => {
    try {
      const { inventoryId, bloodSample } = req.body;
      const inventory = await Inventory.findById(inventoryId);

      if (!inventory) {
        return res.status(404).json({ message: "Inventory not found" });
      }

      // Add the blood sample to the inventory's bloodSamples array
      inventory.bloodSamples.push(bloodSample);
      await inventory.save();

      res.status(200).json({ message: "Blood sample added to the inventory" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Failed to add blood sample to the inventory" });
    }
  },
};

module.exports = inventoryController;
