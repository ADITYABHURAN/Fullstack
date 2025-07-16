// Middleware to check if the user is logged in
import jwt from "jsonwebtoken";

export const isLoggedIn = async (req, res, next) => {
    
  try {
    console.log(req.cookies);
    const token = req.cookies?.token; // Get the token from cookies

    console.log('Token Found: ', token ? "Yes" : "No");

    if (!token) {
      console.log("No token found");
      return res.status(401).json({
        success: false,
        message: "You are not logged in, please login to continue"
      });
    }

    // Decode token data using JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded data: ", decoded);

    req.user = decoded; // Attach decoded user data to request

    next(); // Call next middleware or route handler
  } catch (error) {
    console.error("Auth middleware failure:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};
