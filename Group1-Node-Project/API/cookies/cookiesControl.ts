import ManagerModel from "../manager/managerModel";
import RoleModel from "../role/roleModel";
import EmployeeModel from "../employee/employeeModel";
import CompanyModel from "../company/companyModel";
import AdminModel from "../admin/adminModel";
import availability from "../availability/availabilityModel";
import * as dotenv from "dotenv";
dotenv.config();

import jwt from "jwt-simple";
const secret = process.env.JWT_SECRET as string;

let userType: UserType;
let user: any;
enum UserType {
  Admin,
  Manager,
  Employee,
}

export const login = async (req: any, res: any) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);

    const userDB = await CompanyModel.findOne({ email, password });
    console.log(userDB);

    if (!userDB) throw new Error("name or password are incorrect");
    if (!secret) throw new Error("no token");

    let roleUser: string;

    if (userDB.systemRole === "Admin") {
      roleUser = "Admin";
    } else if (userDB.systemRole === "Manager") {
      roleUser = "Manager";
    } else if (userDB.systemRole === "Employee") {
      roleUser = "Employee";
    } else throw new Error(`role not found`);

    const token = jwt.encode(
      { userId: userDB.originalID, role: roleUser },
      secret
    );
    console.log(token);

    res.cookie("user", token, { maxAge: 500000000, httpOnly: true });

    res.status(201).send({ ok: true });
  } catch (error: any) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
};

export const getUser = async (req: any, res: any) => {
  try {
    const { user } = req.cookies;
    console.log(user);

    if (!user) {
      res.status(500).send({ message: "you are not a user" });
    }
    if (!secret) throw new Error("no token");

    const decoded = jwt.decode(user, secret);
    const { userId, role } = decoded;
    console.log(userId, role);

    let userDB: any;

    if (role === "Admin") {
      userDB = await AdminModel.findById(userId);
      userType = UserType.Admin;
    } else if (role === "Manager") {
      userDB = await ManagerModel.findById(userId);
      userType = UserType.Manager;
    } else if (role === "Employee") {
      userDB = await EmployeeModel.findById(userId);
      userType = UserType.Employee;
    } else throw new Error(`role not found`);

    console.log(userDB);

    res.send({ ok: true, user: userDB, userType: userType });
  } catch (error: any) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
};
