import EmployeeModel from "./employeeModel";
import ManagerModel from "../manager/managerModel";
import RoleModel from "../role/roleModel";
import CompanyModel from "../company/companyModel";
import AdminModel from "../admin/adminModel";
import AttendanceModel from "../attendance/attendanceModel";
import jwt from "jwt-simple";
const secret = process.env.JWT_SECRET;

export const login = async (req: any, res: any) => {
  try {
    const { name, password } = req.body;
    console.log(name, password);

    const employeeDB = await EmployeeModel.findOne({ name, password });

    if (!employeeDB) throw new Error("Username or password are incorrect");
    if (!secret) throw new Error("no token");
    const token = jwt.encode(
      { userId: employeeDB._id, role: "public" },
      secret
    );
    console.log(token);

    res.cookie("employee", token, { maxAge: 500000000, httpOnly: true });

    res.status(201).send({ ok: true });
  } catch (error: any) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
};
