const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: false,
    },
    address: {
      streetName: { type: String },
      city: { type: String },
      state: { type: String },
    },
    role: {
      type: String,
      required: true,
      enum: ["donor", "hospital", "admin"],
    },
    fullName: String, // Full name of the user
    registrationStatus: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },

    donor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Donor",
    },
    hospital: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hospital",
    },
    isAdmin: {
      type: Boolean,
      required: function () {
        if (this.role === "admin") {
          return true;
        }
        return false;
      },
    },
    isDonor: {
      type: Boolean,
      required: function () {
        if (this.role === "donor") {
          return true;
        }
        return false;
      },
    },
    isHospital: {
      type: Boolean,
      required: function () {
        if (this.role === "hospital") {
          return true;
        }
        return false;
      },
    },
    // Add more fields as needed
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("User", userSchema);

// // // Will be used in login pages
// // username: {
// //     type: String,
// //     required: true,
// //     unique: true,
// //   },
// //   // Will be needed to send OTPs
// //   email: {
// //     type: String,
// //     required: [true, "Please provide an Email"],
// //     unique: true,
// //   },
// //   // TO-DO Encryption in logic
// //   password: {
// //     type: String,
// //     required: [true, "please enter a password"],
// //     Select: false,
// //   },
// //   // Needed Medical history
// //   medical_profile: {
// //     blood_type: String,
// //     allergies: String,
// //     medications: String,
// //     medicalCondition: String,
// //     // TO-DO Define more info needed for profile
// //   },
// //   first_name: {
// //     type: String,
// //     required: true,
// //   },
// //   last_name: {
// //     type: String,
// //     required: true,
// //   },
// //   // Everytime a user makes a blood donation, the Donation object related to the user gets inserted to this array
// //   donations: { type: [] },
// //   address: {
// //     country: String,
// //     region: String,
// //     street: String,
// //     postcode: String,
// //     geo_address: {
// //       longitude: String,
// //       latitude: String,
// //     },
// //   },
// //   phone: {
// //     type: String,
// //     required: [true, "phone number is required"],
// //   },
// //   isAdmin: {
// //     type: Boolean,
// //     default: false,
// //   },
// //   inventories: [
// //     {
// //       type: mongoose.Schema.Types.ObjectId,
// //       ref: "Inventory",
// //     },
// //   ],
// // },

// // version 2
