const Inventory = require("../models/inventoryModel");

const bloodSampleController = {
  // Create a new blood sample in the inventory
  createBloodSample: async (req, res) => {
    try {
      const { inventoryId, bloodSample } = req.body;
      console.log("Received inventoryId:", inventoryId);
      const inventory = await Inventory.findById(inventoryId);

      if (!inventory) {
        return res.status(404).json({ message: "Inventory not found" });
      }

      inventory.bloodSamples.push(bloodSample);
      await inventory.save();

      res.status(201).json({ message: "Blood sample added to the inventory" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to add blood sample" });
    }
  },

  // Read all blood samples in the inventory
  getBloodSamples: async (req, res) => {
    try {
      const { inventoryId } = req.params;
      const inventory = await Inventory.findById(inventoryId);

      if (!inventory) {
        return res.status(404).json({ message: "Inventory not found" });
      }

      res.status(200).json(inventory.bloodSamples);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to retrieve blood samples" });
    }
  },

  // Update a blood sample in the inventory
  updateBloodSample: async (req, res) => {
    try {
      const { inventoryId, bloodSampleId, updatedBloodSample } = req.body;
      const inventory = await Inventory.findById(inventoryId);

      if (!inventory) {
        return res.status(404).json({ message: "Inventory not found" });
      }

      const bloodSample = inventory.bloodSamples.id(bloodSampleId);

      if (!bloodSample) {
        return res.status(404).json({ message: "Blood sample not found" });
      }

      Object.assign(bloodSample, updatedBloodSample);
      await inventory.save();

      res.status(200).json({ message: "Blood sample updated successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to update blood sample" });
    }
  },

  // Delete a blood sample from the inventory
  // deleteBloodSample: async (req, res) => {
  //   try {
  //     const { inventoryId, bloodSampleId } = req.params;
  //     const inventory = await Inventory.findById(inventoryId);

  //     if (!inventory) {
  //       return res.status(404).json({ message: "Inventory not found" });
  //     }
  //     console.log(inventory.bloodSamples);
  //     const bloodSample = inventory.bloodSamples.id(bloodSampleId);

  //     if (!bloodSample) {
  //       return res.status(404).json({ message: "Blood sample not found" });
  //     }

  //     bloodSample.remove();
  //     await inventory.save();

  //     res.status(200).json({ message: "Blood sample deleted successfully" });
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ message: "Failed to delete blood sample" });
  //   }
  // },
  // Delete a blood sample from the inventory
  // Delete a blood sample from the inventory
  // Delete a blood sample from the inventory
  deleteBloodSample: async (req, res) => {
    try {
      const { inventoryId, bloodSampleId } = req.params;
      const inventory = await Inventory.findById(inventoryId);

      if (!inventory) {
        return res.status(404).json({ message: "Inventory not found" });
      }

      // Use Mongoose array filtering to remove the subdocument
      inventory.bloodSamples = inventory.bloodSamples.filter((sample) => {
        return sample._id.toString() !== bloodSampleId;
      });

      await inventory.save();

      res.status(200).json({ message: "Blood sample deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to delete blood sample" });
    }
  },
};

module.exports = bloodSampleController;
