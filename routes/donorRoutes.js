const express = require("express");
const donorController = require("../controllers/donorController");

const router = express.Router();

// Define routes for donor functionality
router.get("/donationInfo", donorController.getDonationInfo);
router.put("/updateDonorInfo", donorController.updateDonorInfo);
router.post(
  "/scheduleDonationAppointment",
  donorController.scheduleDonationAppointment
);
router.get("/donationHistory/:donorId", donorController.getDonationHistory);
router.post("/receiveNotifications", donorController.receiveNotifications);

// Add more routes as needed based on your user story

module.exports = router;
