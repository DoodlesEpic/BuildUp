import * as jwt from "jsonwebtoken";
import * as asyncHandler from "express-async-handler";
import User from "../models/userModel";

export const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET must be defined");

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    // Check if the token is in the header
    try {
      // Get the token from the header
      token = req.headers.authorization.split(" ")[1];

      // Verify the token
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET) as any;

      // Add the user from the token to the request
      req.user = (await User.findById(decodedToken.id)) as any;

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
