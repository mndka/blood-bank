const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  donor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Donor",
    required: true,
  },
  hospital: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hospital",
    required: true,
  },
  appointmentDate: {
    type: Date,
    required: true,
  },
  appointmentTime: {
    type: String,
  },
  additionalInfo: {
    type: String,
  },
});

module.exports = mongoose.model("Appointment", appointmentSchema);
