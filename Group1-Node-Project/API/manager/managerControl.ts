import ManagerModel from "./managerModel";
import RoleModel from "../role/roleModel";
import EmployeeModel from "../employee/employeeModel";
import CompanyModel from "../company/companyModel";
import AdminModel from "../admin/adminModel";
import availability from "../availability/availabilityModel";
import * as dotenv from "dotenv";
dotenv.config();

import jwt from "jwt-simple";
const secret = process.env.JWT_SECRET as string;
// const secret: string = "secret";

export const login = async (req: any, res: any) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);

    const managerDB = await ManagerModel.findOne({ email, password });

    if (!managerDB) throw new Error("name or password are incorrect");
    if (!secret) throw new Error("no token");
    const token = jwt.encode(
      { managerId: managerDB._id, role: "manager" },
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

export const getSelectedManager = async (req: any, res: any) => {
  try {
    const { idNumber } = req.body;
    if (!idNumber) throw new Error("no id");

    const managerDB: any = await ManagerModel.find({
      idNumber: idNumber,
    })
      .populate("employees")
      .exec();
    console.log(managerDB);

    res.send({ managerDB });
  } catch (error: any) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
};

export const getSelectedSalaryUp = async (req: any, res: any) => {
  try {
    const { salaryUp, _id } = req.body;
    console.log(salaryUp);

    const employees = await ManagerModel.findById(_id)
      .populate({
        path: "employees",
        match: {
          salaryPerHour: { $gt: salaryUp },
        },
        populate: {
          path: "role",
          model: "Role",
        },
      })
      .exec();

    console.log(employees);

    res.send({ employees });
  } catch (error) {
    console.log(error);
  }
};

export const getSelectedSalaryDown = async (req: any, res: any) => {
  try {
    const { salaryDown, _id } = req.body;
    console.log(salaryDown);

    const employees = await ManagerModel.findById(_id)
      .populate({
        path: "employees",
        match: {
          salaryPerHour: { $lt: salaryDown },
        },
        populate: {
          path: "role",
          model: "Role",
        },
      })
      .exec();

    console.log(employees);

    res.send({ employees });
  } catch (error) {
    console.log(error);
  }
};

export const getSelectedSalaryBetween = async (req: any, res: any) => {
  try {
    const { minSalary, maxSalary, _id } = req.body;
    console.log(minSalary, maxSalary);

    const employees = await ManagerModel.findById(_id)
      .populate({
        path: "employees",
        match: {
          salaryPerHour: { $gte: minSalary, $lte: maxSalary },
        },
        populate: {
          path: "role",
          model: "Role",
        },
      })
      .exec();
    console.log(employees);

    res.send({ employees });
  } catch (error) {
    console.log(error);
  }
};

export const getEmployeesList = async (req: any, res: any) => {
  try {
    const { _id } = req.body;

    const employees = await ManagerModel.findById(_id)
      .populate({
        path: "employees",

        populate: {
          path: "role",
          model: "Role",
        },
      })
      .exec();

    // .populate({
    //   path: "employees",
    //   populate: {
    //     path: "role",
    //     model: "Role",
    //   },
    // })
    if (employees) console.log(employees);

    res.send({ employees });
  } catch (error: any) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
};

export const addManager = async (req: any, res: any) => {
  try {
    let { name, email, password, idNumber, phone, birthday, salary, role } =
      req.body;
    if (role) {
      const roleID = await RoleModel.find({ name: role }).select({ _id: 1 });
      role = roleID[0]._id.toString();
    }
    const managerDB = await ManagerModel.create({
      name,
      email,
      password,
      idNumber,
      phone,
      birthday,
      salary,
      role,
    });
    console.log(managerDB);

    res.status(200).send({ ok: true });
  } catch (error) {
    console.log(error);
    res.status(500).send("did not get data");
  }
};
