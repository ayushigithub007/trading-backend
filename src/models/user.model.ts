import {
  Table,
  Column,
  Model,
  DataType,
  BeforeCreate
} from "sequelize-typescript";
import bcrypt from "bcrypt";

@Table({
  tableName: "users",
  timestamps: true
})
export class User extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  name!: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false
  })
  email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  password!: string;

  @Column({
    type: DataType.ENUM("admin", "user"),
    defaultValue: "user"
  })
  role!: "admin" | "user";

  @BeforeCreate
  static async hashPassword(instance: User) {
    instance.password = await bcrypt.hash(instance.password, 10);
  }
}
