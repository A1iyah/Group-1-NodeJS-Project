import ManagerModel from "./managerModel";
import RoleModel from "../role/roleModel";
import EmployeeModel from "../employee/employeeModel";
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

    const managerDB = await ManagerModel.findOne({ email, password });

    if (!managerDB) throw new Error("name or password are incorrect");
    if (!secret) throw new Error("no token");
    const token = jwt.encode(
      { managerId: managerDB._id, role: "public" },
      secret
    );
    console.log(token);

    res.cookie("manager", token, { maxAge: 500000000, httpOnly: true });

    res.status(201).send({ ok: true });
  } catch (error: any) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
};

export const getManager = async (req: any, res: any) => {
  try {
    const { manager } = req.cookies;
    if (!secret) throw new Error("no token");
    const decoded = jwt.decode(manager, secret);
    console.log(decoded);
    const { managerId, role } = decoded;

    const managerDB: any = await ManagerModel.findById(managerId);

    res.send({ ok: true, manager: managerDB });
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

    const updateUser = await ManagerModel.findByIdAndUpdate(
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
