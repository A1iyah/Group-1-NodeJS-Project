import EmployeeModel from "./employeeModel";
import ManagerModel from "../manager/managerModel";
import RoleModel from "../role/roleModel";
import CompanyModel from "../company/companyModel";
import AdminModel from "../admin/adminModel";
import AttendanceModel from "../attendance/attendanceModel";
import jwt from "jwt-simple";
// const secret = process.env.JWT_SECRET;
const secret: string = "secret";

export const login = async (req: any, res: any) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);

    const employeeDB = await EmployeeModel.findOne({ email, password });

    if (!employeeDB) throw new Error("Username or password are incorrect");
    if (!secret) throw new Error("no token");
    const token = jwt.encode(
      { employeeId: employeeDB._id, role: "public" },
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

export const getEmployee = async (req: any, res: any) => {
  try {
    const { employee } = req.cookies;
    if (!secret) throw new Error("no token");
    const decoded = jwt.decode(employee, secret);
    console.log(decoded);
    const { employeeId, role } = decoded;

    const employeeDB: any = await EmployeeModel.findById(employeeId);

    res.send({ ok: true, employee: employeeDB });
  } catch (error: any) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
};

export const addAttendance = async (req: any, res: any) => {
  try {
    const { userDB, totalTimeShift } = req.body;
    if (!totalTimeShift) throw new Error("no shift time");
    if (!userDB) throw new Error("no user");

    const updateUser = await EmployeeModel.findByIdAndUpdate(
      userDB._id,
      {
        $push: {
          attendance: {
            date: new Date().toLocaleString(),
            clock: totalTimeShift,
          },
        },
      },
      { new: true }
    );
    console.log(userDB);

    res.send({ ok: true });
  } catch (error: any) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
};
