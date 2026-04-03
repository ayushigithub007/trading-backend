import { Request, Response } from "express";
import { User } from "../models/user.model";
import { hashPassword } from "../utils/hash";

class UserController {

  // 👤 Admin creates user
  async createUser(req: Request, res: Response) {
    const { name, email, password } = req.body;

    const existing = await User.findOne({ where: { email } });
    if (existing) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await hashPassword(password);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "user"
    });

    return res.status(201).json({
      message: "User created successfully",
      userId: user.id
    });
  }
}

export default new UserController();
