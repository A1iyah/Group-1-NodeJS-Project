import AdminModel from "./adminModel";
import ManagerModel from "../manager/managerModel";
import RoleModel from "../role/roleModel";
import EmployeeModel from "../employee/employeeModel";
import CompanyModel from "../company/companyModel";
import availability from "../availability/availabilityModel";
import jwt from "jwt-simple";
// const secret: string | undefined = process.env.JWT_SECRET;
const secret: string = "secret";

export const login = async (req: any, res: any) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);

    const adminDB = await AdminModel.findOne({ email, password });

    if (!adminDB) throw new Error("Username or password are incorrect");
    if (!secret) throw new Error("no token");
    const token = jwt.encode({ adminId: adminDB._id, role: "public" }, secret);
    console.log(token);

    res.cookie("admin", token, { maxAge: 500000000, httpOnly: true });

    res.status(201).send({ ok: true });
  } catch (error: any) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
};

export const getAdmin = async (req: any, res: any) => {
  try {
    const { admin } = req.cookies;
    if (!secret) throw new Error("no token");
    const decoded = jwt.decode(admin, secret);
    console.log(decoded);
    const { adminId, role } = decoded;

    const adminDB: any = await AdminModel.findById(adminId);

    res.send({ ok: true, admin: adminDB });
  } catch (error: any) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
};
