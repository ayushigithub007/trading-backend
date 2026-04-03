import { Sequelize } from "sequelize-typescript";
import { User } from "../models/user.model";

export const sequelize = new Sequelize(
  {
    host: "localhost",
    dialect: "postgres",
    port: 5433,
    username: process.env.db_user,
    password: process.env.db_password,
    database: process.env.db_name,

    models:[User],
    logging: false
  }
);

export default sequelize;
