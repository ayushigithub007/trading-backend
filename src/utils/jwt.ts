import jwt from "jsonwebtoken";

const JWT_SECRET = "SECRET_KEY_123"; // env me rakhna later

export const generateToken = (payload: object) => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: "1h"
  });
};
