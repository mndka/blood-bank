const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const Donor = require("../models/donorModel");
const Hospital = require("../models/hospitalModel");

const authController = {
  register: async (req, res) => {
    try {
      // Check if the user with the provided email already exists
      const existingUser = await User.findOne({ email: req.body.email });
      if (existingUser) {
        return res
          .status(400)
          .json({ message: "User with this email already exists" });
      }

      // Hash the password before saving it to the database
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      req.body.password = hashedPassword;

      //rest data
      const user = new User({ ...req.body });
      await user.save();

      if (user.role === "donor") {
        const donor = new Donor({
          bloodType: req.body.bloodType,
          dateOfBirth: req.body.dateOfBirth,
          gender: req.body.gender,
          user: user._id, // Link the donor to the user
        });

        await donor.save();
        user.donor = donor._id;
        await user.save();
      } else if (user.role === "hospital") {
        const hospital = new Hospital({
          contactNumber: req.body.contactNumber,
          servicesOffered: req.body.servicesOffered,
          description: req.body.description,
          workingHours: req.body.workingHours,
          user: user._id, // Link the hospital to the user
        });

        await hospital.save();
      }
      // Create a JWT token
      const token = jwt.sign(
        { userId: user._id, role: user.role },
        process.env.JWT_Secret,
        {
          expiresIn: "1h", // You can adjust the expiration time
        }
      );
      user.registrationStatus = "approved";
      await user.save();
      console.log("after saving user to database");
      res.status(201).json({
        success: true,
        message: "user registered success",
        user,
        token,
        isAdmin: req.isAdmin,
        isDonor: req.isDonor,
        isHospital: req.isHospital,
      });
    } catch (error) {
      console.error("error during registration", error);
      res.status(500).json({ message: "Registration failed" });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      // Check if the user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      if (user.role !== req.body.role) {
        return res.status(500).send({
          success: false,
          message: "role dosent match",
        });
      }
      // Compare the provided password with the hashed password in the database
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid password" });
      }

      // Create a JWT token
      const token = jwt.sign({ userId: user._id }, process.env.JWT_Secret, {
        expiresIn: "1d", // You can adjust the expiration time
      });

      res
        .status(200)
        .json({ success: true, message: "login successfull", token, user });
    } catch (error) {
      res.status(500).json({ message: "Login failed" });
    }
  },
  currentUserController: async (req, res) => {
    try {
      // Get the user ID from the request headers
      const userId = req.body.userId;

      if (!userId) {
        // If user ID is missing, return a 401 response
        return res.status(401).send({
          success: false,
          message: "User not authenticated",
        });
      }

      // Check if the user exists
      const user = await User.findOne({ _id: userId });

      if (!user) {
        // If user is not found, return a 404 response
        return res.status(404).send({
          success: false,
          message: "User not found",
        });
      }

      // If user is found, return a 200 response with user data
      return res.status(200).send({
        success: true,
        message: "Current User Data",
        user,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).send({
        success: false,
        message: "Unable to get current user",
        error: error.message, // Include the error message in the response
      });
    }
  },
};

module.exports = authController;
