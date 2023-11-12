const express = require("express");
const router = express.Router();
const hospitalController = require("../controllers/hospitalController");

// Middleware for authentication can be added here

// Route: Create a hospital account
router.post("/createAccount", hospitalController.createAccount);

// Route: Post blood requests
router.post("/postBloodRequest", hospitalController.postBloodRequest);

// Route: View available donors by blood type and location
router.post("/viewAvailableDonors", hospitalController.viewAvailableDonors);

// Route: Send messages to donors to request their assistance
router.post("/sendDonorRequest", hospitalController.sendDonorRequest);

// Route: Update the status of blood requests
router.put(
  "/updateBloodRequestStatus",
  hospitalController.updateBloodRequestStatus
);

module.exports = router;
