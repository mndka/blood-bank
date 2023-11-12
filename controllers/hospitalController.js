const Hospital = require("../models/hospitalModel");
const Donor = require("../models/donorModel");
const User = require("../models/userModel");
const Message = require("../models/messageModel");
const hospitalController = {
  // Feature: Create a hospital account
  createAccount: async (req, res) => {
    try {
      const {
        name,
        email,
        password,
        contactNumber,
        address,
        servicesOffered,
        description,
        workingHours,
      } = req.body;

      // Create a new hospital account
      const newHospital = new Hospital({
        name,
        email,
        password,
        contactNumber,
        address,
        servicesOffered,
        description,
        workingHours,
      });

      // Save the new hospital account in the database
      await newHospital.save();

      res.status(201).send({
        success: true,
        message: "Hospital account created successfully",
        newHospital,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to create hospital account" });
    }
  },

  // Feature: Post blood requests
  postBloodRequest: async (req, res) => {
    try {
      const { hospitalId, bloodType, quantityNeeded } = req.body;

      // Find the hospital by ID
      const hospital = await Hospital.findById(hospitalId);

      if (!hospital) {
        return res.status(404).json({ message: "Hospital not found" });
      }

      // Create and add a new blood request
      const newRequest = {
        bloodType,
        quantityNeeded,
        status: "pending",
        requestDate: new Date(),
      };

      hospital.bloodRequests.push(newRequest);
      await hospital.save();

      res.status(201).json({ message: "Blood request posted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to post blood request" });
    }
  },

  // Feature: View available donors in the area
  viewAvailableDonors: async (req, res) => {
    try {
      const { bloodType, location } = req.body;

      // Implement logic to retrieve available donors based on blood type and location
      const availableDonors = await Donor.find({
        bloodType,
        address: location,
        lastDonationDate: { $lt: new Date() },
      });

      res.status(200).json(availableDonors);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to retrieve available donors" });
    }
  },

  // Feature: Send messages to donors to request their assistance
  sendDonorRequest: async (req, res) => {
    try {
      const { hospitalId, donorId, messageText } = req.body;

      // Find the hospital and donor by their respective IDs
      const hospital = await Hospital.findById(hospitalId);
      const donor = await Donor.findById(donorId);

      if (!hospital || !donor) {
        return res.status(404).json({ message: "Hospital or donor not found" });
      }

      // Implement the messaging system
      const message = new Message({
        sender: hospitalId,
        receiver: donorId,
        messageText,
        timestamp: new Date(),
      });

      await message.save();

      res.status(200).json({ message: "Message sent to donor successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to send message to donor" });
    }
  },

  // Feature: Update the status of blood requests (e.g., fulfilled or pending)
  updateBloodRequestStatus: async (req, res) => {
    try {
      const { hospitalId, requestId, newStatus } = req.body;

      // Find the hospital by ID
      const hospital = await Hospital.findById(hospitalId);

      if (!hospital) {
        return res.status(404).json({ message: "Hospital not found" });
      }

      // Find and update the blood request status
      const request = hospital.bloodRequests.id(requestId);

      if (request) {
        request.status = newStatus;
        await hospital.save();
        res
          .status(200)
          .json({ message: "Blood request status updated successfully" });
      } else {
        res.status(404).json({ message: "Blood request not found" });
      }
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Failed to update blood request status" });
    }
  },
};

module.exports = hospitalController;
