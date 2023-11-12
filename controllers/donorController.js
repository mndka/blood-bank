const Donor = require("../models/donorModel");
const Hospital = require("../models/hospitalModel");
const Appointment = require("../models/appointmentModel");
const User = require("../models/userModel");
const nodemailer = require("nodemailer");

const donorController = {
  getDonationInfo: (req, res) => {
    // You can retrieve information from a database, a configuration file, or provide it directly in the code.
    // For this example, we'll provide information directly in the code.

    const donationInfo = {
      processInfo:
        "Blood donation is a simple and safe process that involves...",
      eligibilityCriteria:
        "To be eligible to donate blood, you must meet certain criteria, including...",
      // You can add more information as needed
    };

    res.status(200).json(donationInfo);
  },

  scheduleDonationAppointment: async (req, res) => {
    const {
      donorId,
      hospitalId,
      appointmentDate,
      appointmentTime,
      additionalInfo,
    } = req.body;

    try {
      // Find the donor and hospital associated with the appointment
      const donor = await User.findById(donorId);
      const hospital = await User.findById(hospitalId);

      if (!donor || !hospital) {
        return res.status(404).json({ message: "Donor or hospital not found" });
      }

      // Parse the appointmentDate from the input as a Date object
      const parsedAppointmentDate = new Date(appointmentDate);

      // Create an appointment record and associate it with the donor and hospital
      const appointment = new Appointment({
        donor: donor._id,
        hospital: hospital._id,
        appointmentDate: parsedAppointmentDate, // Use the parsed date
        appointmentTime,
        additionalInfo,
      });

      // Save the appointment in the database
      await appointment.save();

      // Update the donor's lastDonationDate field
      donor.lastDonationDate = parsedAppointmentDate; // Set lastDonationDate to the parsed date
      await donor.save();

      res.status(201).json({ message: "Appointment scheduled successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to schedule appointment" });
    }
  },
  updateDonorInfo: async (req, res) => {
    const { donorId, updatedInfo } = req.body;

    try {
      // Find the user with the provided user ID and role "donor"
      const donor = await User.findOne({ user: donorId });

      if (!donor) {
        return res.status(404).json({ message: "Donor not found" });
      }

      const user = donor.user;
      // Iterate through the fields in updatedInfo and update the user's record
      for (const field in updatedInfo) {
        if (field in user) {
          user[field] = updatedInfo[field];
        }
      }

      // Save the updated user's record in the database
      await user.save();

      res.status(200).json({ message: "Information updated successfully" });
    } catch (error) {
      // Handle errors
      console.error(error);
      res.status(500).json({ message: "Failed to update donor information" });
    }
  },
  getDonationHistory: async (req, res) => {
    const donorId = req.params.donorId;

    try {
      // Find the donor by ID
      const donor = await Donor.findById(donorId);

      if (!donor) {
        return res.status(404).json({ message: "Donor not found" });
      }
      // Check if the user's role is 'donor'
      // if (donor.role !== "donor") {
      //   return res.status(400).json({ message: "User is not a donor" });
      // }
      // Retrieve the donation history for the donor from the database
      const donationHistory = donor.donations;

      res.status(200).json(donationHistory);
    } catch (error) {
      // Handle errors
      console.error(error);
      res.status(500).json({ message: "Failed to retrieve donation history" });
    }
  },
  receiveNotifications: async (req, res) => {
    try {
      // Create a Nodemailer transporter using your email service's configuration
      const transporter = nodemailer.createTransport({
        service: "YourEmailService", // e.g., 'Gmail', 'Outlook'
        auth: {
          user: "your@email.com",
          pass: "your_password",
        },
      });

      // Define the email message
      const mailOptions = {
        from: "your@email.com",
        to: "recipient@email.com", // Replace with the donor's email address
        subject: "Notification Subject",
        text: "Notification Message", // You can customize the email content
      };

      // Send the email
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error(error);
          res
            .status(500)
            .json({ message: "Failed to send email notification" });
        } else {
          console.log("Email sent: " + info.response);
          res
            .status(200)
            .json({ message: "Email notification sent successfully" });
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to send email notification" });
    }
  },
};

module.exports = donorController;
