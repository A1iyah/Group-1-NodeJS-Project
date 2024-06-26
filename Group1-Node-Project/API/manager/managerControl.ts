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

export const addAttendance = async (req: any, res: any) => {
  try {
    const { user, totalTimeShift } = req.body;
    if (!totalTimeShift) throw new Error("no shift time");
    if (!user) throw new Error("no user");

    const updateUser = await ManagerModel.findByIdAndUpdate(
      user._id,
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

    res.send({ ok: true });
  } catch (error: any) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
};

export const getSelectedManager = async (req: any, res: any) => {
  try {
    const { idNumber } = req.body;
    console.log(idNumber);

    if (!idNumber) throw new Error("no id");

    const managerDB: any = await ManagerModel.find({
      idNumber: idNumber,
    })
      .populate("role")
      .populate({
        path: "employees",

        populate: {
          path: "role",
          model: "Role",
        },
      });
    // .exec();
    res.send({ managerDB });
  } catch (error: any) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
};

export const getSelectedSalaryUp = async (req: any, res: any) => {
  try {
    const { salaryUp, _id } = req.body;

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

    res.send({ employees });
  } catch (error) {
    console.log(error);
  }
};

export const getSelectedSalaryDown = async (req: any, res: any) => {
  try {
    const { salaryDown, _id } = req.body;

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

    res.send({ employees });
  } catch (error) {
    console.log(error);
  }
};

export const getSelectedSalaryBetween = async (req: any, res: any) => {
  try {
    const { minSalary, maxSalary, _id } = req.body;

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

    res.send({ employees });
  } catch (error: any) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
};
