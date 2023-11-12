const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema({
  location: {
    type: String,
    required: true,
  },
  hospital: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hospital",
  },
  donor: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Donor",
    },
  ],
  bloodSamples: [
    {
      bloodType: String,
      quantity: Number,
      expiryDate: Date,
      // Add more fields related to blood samples as needed
    },
  ],
});

module.exports = mongoose.model("Inventory", inventorySchema);
