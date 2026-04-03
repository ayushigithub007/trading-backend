import { Request, Response } from "express";
import { User } from "../models/user.model";
import { comparePassword } from "../utils/hash";
import { generateToken } from "../utils/jwt";

class AuthController {

  // 🔐 LOGIN (Admin + User)
  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await comparePassword(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // 🔥 New token every login
    const token = generateToken({
      id: user.id,
      role: user.role
    });

    return res.json({
      message: "Login successful",
      token,
      role: user.role
    });
  }
}

export default new AuthController();
