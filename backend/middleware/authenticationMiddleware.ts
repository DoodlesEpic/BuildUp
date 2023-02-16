import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel";

export const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Check if the token is in the header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get the token from the header
      token = req.headers.authorization.split(" ")[1];

      // Verify the token
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

      // Add the user from the token to the request
      req.user = await User.findById(decodedToken.id);

      // Continue to the next middleware
      next();

      // If the token is not valid
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized");
    }
  }

  // Make sure the user is logged in
  if (!token) {
    res.status(401);
    throw new Error("You must be logged in to access this route");
  }
});
