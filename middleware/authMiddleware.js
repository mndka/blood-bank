const JWT = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    // Check if the "Authorization" header is present
    const tokenHeader = req.headers["authorization"];
    if (!tokenHeader) {
      return res.status(401).json({
        success: false,
        message: "Token is missing in the 'Authorization' header",
      });
    }

    // Extract the token from the "Authorization" header
    const token = tokenHeader.split(" ")[1];

    // Verify the token using the secret key
    JWT.verify(token, process.env.JWT_Secret, (err, decoded) => {
      if (err) {
        // Return a 401 response with a clear message for token validation failure
        return res.status(401).json({
          success: false,
          message: "Token is not valid",
        });
      } else {
        // Attach the decoded user ID and role to the request object
        req.body.userId = decoded.userId;

        // Set flags based on the user's role
        req.isAdmin = decoded.role === "admin";
        req.isDonor = decoded.role === "donor";
        req.isHospital = decoded.role === "hospital";

        next();
      }
    });
  } catch (error) {
    console.error(error);

    // Return a 500 response for other unexpected errors
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Internal Server Error",
    });
  }
};
