import AdminModel from "./adminModel";
import ManagerModel from "../manager/managerModel";
import RoleModel from "../role/roleModel";
import EmployeeModel from "../employee/employeeModel";
import CompanyModel from "../company/companyModel";
import AttendanceModel from "../attendance/attendanceModel";
import jwt from "jwt-simple";
// const secret: string | undefined = process.env.JWT_SECRET;
const secret: string = "secret";

export const login = async (req: any, res: any) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);

    const userDB = await AdminModel.findOne({ email, password });

    if (!userDB) throw new Error("Username or password are incorrect");
    if (!secret) throw new Error("no token");
    const token = jwt.encode({ userId: userDB._id, role: "public" }, secret);
    console.log(token);

    res.cookie("user", token, { maxAge: 500000000, httpOnly: true });

    res.status(201).send({ ok: true });
  } catch (error: any) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
};

export const getAdmin = async (req: any, res: any) => {
  try {
    const { user } = req.cookies;
    if (!secret) throw new Error("no token");
    const decoded = jwt.decode(user, secret);
    console.log(decoded);
    const { userId, role } = decoded;

    const userDB: any = await AdminModel.findById(userId);

    res.send({ ok: true, user: userDB });
  } catch (error: any) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
};
