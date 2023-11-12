const mongoose = require("mongoose");

const hospitalSchema = new mongoose.Schema({
  contactNumber: String,
  servicesOffered: [String], // An array of services offered by the hospital
  description: String, // A brief description of the hospital
  workingHours: String, // Hospital's working hours
  // Add more fields as needed
  // Blood Requests
  bloodRequests: [
    {
      bloodType: String,
      quantityNeeded: Number,
      status: String, // e.g., 'pending', 'fulfilled', 'closed'
      requestDate: Date,
      requestStatus: String, // e.g., 'open', 'closed'
      // Add more request-related fields
    },
  ],
});
module.exports = mongoose.model("Hospital", hospitalSchema);
