const mongoose = require("mongoose");

const donorSchema = new mongoose.Schema({
  bloodType: {
    type: String,
    required: true,
  },
  dateOfBirth: Date,
  gender: {
    type: String,
    required: true,
  },
  eligibilityCriteria: String, // Text describing eligibility criteria
  medicalHistory: String, // Text describing medical history
  lastDonationDate: Date,
  // Add more fields as needed
  // Donation History
  donations: [
    {
      hospital: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hospital",
      },
      donationDate: Date,
      donationStatus: String, // e.g., 'successful', 'failed'
      // Add more donation-related fields
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Donor", donorSchema);

// version 2

// const donorSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   contactNumber: String,
//   bloodType: {
//     type: String,
//     required: true,
//   },
//   dateOfBirth: Date,
//   gender: {
//     type: String,
//     required: true,
//   },
//   eligibilityCriteria: String,
//   medicalHistory: String,
//   lastDonationDate: Date,
//   donations: [
//     {
//       hospital: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Hospital",
//       },
//       donationDate: Date,
//       donationStatus: String,
//     },
//   ],
// });

// module.exports = mongoose.model("Donor", donorSchema);
