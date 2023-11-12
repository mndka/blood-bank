const mongoose = require("mongoose");
const User = require("../models/userModel");
const Donor = require("../models/donorModel");
const Hospital = require("../models/hospitalModel");
const Message = require("../models/messageModel");

const adminController = {
  // Feature: Reset User Password
  resetUserPassword: async (req, res) => {
    try {
      const { userId, newPassword } = req.body;

      // Find the user by ID
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Implement password reset logic (e.g., update the password)
      user.password = newPassword;
      await user.save();

      res.status(200).json({ message: "User password reset successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to reset user password" });
    }
  },

  // Feature: View and Monitor Donation Requests and Donations
  viewDonationRequestsAndDonations: async (req, res) => {
    try {
      // Retrieve donation requests and donations from the database with additional data
      const donationRequests = await Donor.find()
        .populate("donations.hospital")
        .select("name email bloodType")
        .exec();

      // You can include more fields in the `select` method to retrieve additional data.
      // For example, if you have more fields like 'dateOfBirth' and 'contactNumber':
      // .select('name email bloodType dateOfBirth contactNumber')

      // Add more data retrieval or formatting as needed

      res.status(200).json(donationRequests);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Failed to retrieve donation requests and donations",
      });
    }
  },

  // Feature: Send System-Wide Notifications
  sendSystemWideNotification: async (req, res) => {
    try {
      const { messageText } = req.body;

      // Send the specified message to all users
      const users = await User.find();

      // Implement the logic to send notifications or messages to users
      const notificationPromises = users.map(async (user) => {
        const message = new Message({
          sender: "system", // You can use a special 'system' identifier as the sender
          receiver: user._id, // Assuming user model has an _id field
          messageText,
          timestamp: new Date(),
        });

        await message.save();
      });

      await Promise.all(notificationPromises);

      res
        .status(200)
        .json({ message: "System-wide notification sent successfully" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Failed to send system-wide notification" });
    }
  },

  // Feature: Access Analytics and Reports on Donation Activity
  accessAnalyticsAndReports: async (req, res) => {
    try {
      // Implement the logic to retrieve and display analytics and reports
      // You can gather and analyze data from both the Donor and Hospital models.
      const totalDonors = await Donor.countDocuments();
      const totalHospitals = await Hospital.countDocuments();

      // Calculate the total number of blood donations
      const totalBloodDonations = (await Donor.find()).reduce(
        (acc, donor) => acc + donor.donations.length,
        0
      );

      // Example: Calculate the average age of donors
      const donors = await Donor.find();
      const totalDonorAge = donors.reduce((acc, donor) => {
        if (donor.dateOfBirth) {
          const birthDate = new Date(donor.dateOfBirth);
          const age = new Date().getFullYear() - birthDate.getFullYear();
          return acc + age;
        }
        return acc;
      }, 0);
      const averageDonorAge = totalDonorAge / totalDonors;

      // Additional analytics and reports fields
      const totalPendingBloodRequests = (await Hospital.find()).reduce(
        (acc, hospital) => {
          return (
            acc +
            hospital.bloodRequests.filter(
              (request) => request.status === "pending"
            ).length
          );
        },
        0
      );

      // Example: Calculate the percentage of donors with a recent donation
      const recentDonors = donors.filter(
        (donor) =>
          donor.lastDonationDate &&
          new Date(donor.lastDonationDate) >=
            new Date(new Date().setMonth(new Date().getMonth() - 3))
      );
      const percentageRecentDonors = (recentDonors.length / totalDonors) * 100;

      // You can add more data retrieval and report generation logic as needed.

      const analyticsAndReports = {
        totalDonors,
        totalHospitals,
        totalBloodDonations, // Include the total blood donations
        averageDonorAge,
        totalPendingBloodRequests,
        percentageRecentDonors,
        // Add more report data here.
      };

      res.status(200).json(analyticsAndReports);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Failed to access analytics and reports" });
    }
  },

  // Feature: Manage User Accounts
  manageUserAccounts: async (req, res) => {
    try {
      const { action, userId } = req.body;

      // Find the user by ID
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      if (action === "disable") {
        // Disable the user's account by setting the status to 'disabled'
        user.status = "disabled";
        await user.save();
        res.status(200).json({ message: "User account disabled" });
      } else if (action === "edit") {
        // Implement logic to edit the user's account (e.g., updating user information)
        // You can update the user's fields as needed
        // user.fullName = req.body.fullName;
        // user.profilePicture = req.body.profilePicture;
        // ...

        // Save the changes to the user's account
        await user.save();
        res.status(200).json({ message: "User account edited successfully" });
      } else if (action === "deactivate") {
        // Deactivate the user's account by setting the status to 'deactivated'
        user.status = "deactivated";
        await user.save();
        res.status(200).json({ message: "User account deactivated" });
      } else {
        res.status(400).json({ message: "Invalid action" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to manage user accounts" });
    }
  },

  // Feature: Approve or Reject User Registrations
  approveOrRejectUserRegistrations: async (req, res) => {
    try {
      const { userId, approvalStatus } = req.body;

      // Find the user by ID
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      if (approvalStatus === "approved") {
        // If the approvalStatus is 'approved', set the user's registration status to 'approved'
        user.registrationStatus = "approved";
        // You can add more logic here for additional steps after approval.
      } else if (approvalStatus === "rejected") {
        // If the approvalStatus is 'rejected', set the user's registration status to 'rejected'
        user.registrationStatus = "rejected";
        // You can add more logic here for additional steps after rejection.
      } else {
        return res.status(400).json({ message: "Invalid approvalStatus" });
      }

      // Save the updated user information
      await user.save();

      res
        .status(200)
        .json({ message: "User registration approval/rejection completed" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Failed to approve/reject user registrations" });
    }
  },

  // Feature: Manage Hospitals
  manageHospitals: async (req, res) => {
    try {
      const { hospitalId, updatedInfo } = req.body;

      // Find the hospital by ID
      const hospital = await Hospital.findById(hospitalId);

      if (!hospital) {
        return res.status(404).json({ message: "Hospital not found" });
      }

      // Define an object with the fields to update
      const updatedFields = {
        name: updatedInfo.name,
        email: updatedInfo.email,
        contactNumber: updatedInfo.contactNumber,
        address: updatedInfo.address,
        servicesOffered: updatedInfo.servicesOffered,
        description: updatedInfo.description,
        workingHours: updatedInfo.workingHours,
        // Add more fields as needed
      };

      // Spread the updated fields into the hospital
      Object.assign(hospital, updatedFields);

      // Save the updated hospital information
      await hospital.save();

      res
        .status(200)
        .json({ message: "Hospital information updated successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to manage hospitals" });
    }
  },
};

module.exports = adminController;
