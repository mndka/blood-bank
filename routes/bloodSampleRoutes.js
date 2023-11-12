// const express = require("express");
// const router = express.Router();
// const bloodSampleController = require("../controllers/bloodSampleController");

// // Create a new blood sample in the inventory
// router.post(
//   "/ivnentory/:inventoryId/blood-samples",
//   bloodSampleController.createBloodSample
// );

// // Read all blood samples in the inventory
// router.get(
//   "/inventory/:inventoryId/blood-samples",
//   bloodSampleController.getBloodSamples
// );

// // Update a blood sample in the inventory
// router.put(
//   "/inventory/:inventoryId/blood-samples/:bloodSampleId",
//   bloodSampleController.updateBloodSample
// );

// // Delete a blood sample from the inventory
// router.delete(
//   "/inventory/:inventoryId/blood-samples/:bloodSampleId",
//   bloodSampleController.deleteBloodSample
// );

// module.exports = router;
const express = require("express");
const router = express.Router();
const bloodSampleController = require("../controllers/bloodSampleController");

// Create a new blood sample in the inventory
router.post(
  "/:inventoryId/blood-sample",
  bloodSampleController.createBloodSample
);

// Read all blood samples in the inventory
router.get("/:inventoryId/blood-sample", bloodSampleController.getBloodSamples);

// Update a blood sample in the inventory
router.put(
  "/:inventoryId/blood-samples/:bloodSampleId",
  bloodSampleController.updateBloodSample
);

// Delete a blood sample from the inventory  
router.delete(
  "/:inventoryId/blood-samples/:bloodSampleId",
  bloodSampleController.deleteBloodSample
);

module.exports = router;
