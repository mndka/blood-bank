const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const { adminAuthorization } = require("../middleware/authMiddleware");

// Define routes for admin actions
router.post("/reset-password", adminController.resetUserPassword);
router.post(
  "/approve-reject-registrations",
  adminController.approveOrRejectUserRegistrations
);
router.post("/manage-user-accounts", adminController.manageUserAccounts);
router.get(
  "/view-donation-requests-and-donations",
  adminController.viewDonationRequestsAndDonations
);
router.post(
  "/send-system-wide-notification",
  adminController.sendSystemWideNotification
);
router.get(
  "/access-analytics-and-reports",
  adminController.accessAnalyticsAndReports
);

// Add more routes as needed

module.exports = router;
