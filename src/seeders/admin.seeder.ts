import bcrypt from "bcrypt";
import { User } from "../models/user.model";

export const adminSeeder = async () => {
  const adminEmail = "admin@trading.com";

  const adminExists = await User.findOne({
    where: { email: adminEmail }
  });

  if (!adminExists) {
    const hashedPassword = await bcrypt.hash("Admin@123", 10);

    await User.create({
      name: "Super Admin",
      email: adminEmail,
      password: hashedPassword,
      role: "admin"
    });

    console.log("✅ Admin created");
  } else {
    console.log("ℹ️ Admin already exists");
  }
};
