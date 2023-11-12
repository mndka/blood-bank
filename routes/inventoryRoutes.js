const express = require("express");
const router = express.Router();
const inventoryController = require("../controllers/inventoryController");

// Create a new inventory
router.post("/", inventoryController.createInventory);

// Read a specific inventory by ID
router.get("/:inventoryId", inventoryController.getInventory);

// Add a donor to the inventory
router.post("/add-donor", inventoryController.addDonorToInventory);

// Add a blood sample to the inventory
router.post("/add-blood-sample", inventoryController.addBloodSampleToInventory);

module.exports = router;
