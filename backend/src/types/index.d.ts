import jwt from "jsonwebtoken";
import express from "express";

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }

  namespace jwt {
    interface JwtPayload {
      id?: string;
    }
  }
}
