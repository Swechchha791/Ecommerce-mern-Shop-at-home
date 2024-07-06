const jwt = require("jsonwebtoken");

async function authToken(req, res, next) {
  try {
    // Extract the token from cookies or the authorization header
    const token =
      req.cookies?.token || req.headers["authorization"]?.split(" ")[1];

    // If no token is found, return an error response
    if (!token) {
      return res.status(200).json({
        message: "Please Login...",
        error: true,
        success: false,
      });
    }

    // Verify the token using the secret key
    jwt.verify(token, process.env.TOKEN_SECRET_KEY, function (err, decoded) {
      // If there is an error during verification, log the error and return an error response
      if (err) {
        console.log("error auth", err);
        return res.status(401).json({
          message: "Invalid token",
          error: true,
          success: false,
        });
      }

      // If verification is successful, decode the token and store the user ID in the request object
      req.userId = decoded?._id;

      // Proceed to the next middleware/controller
      next();
    });
  } catch (err) {
    // Handle any unexpected errors
    res.status(400).json({
      message: err.message || err,
      data: [],
      error: true,
      success: false,
    });
  }
}

module.exports = authToken;
