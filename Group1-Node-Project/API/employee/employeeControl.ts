import EmployeeModel from "./employeeModel";
import ManagerModel from "../manager/managerModel";
import RoleModel from "../role/roleModel";
import CompanyModel from "../company/companyModel";
import AdminModel from "../admin/adminModel";
import availability from "../availability/availabilityModel";
import { getRoleIdByName } from "../role/roleControl";
import * as dotenv from "dotenv";
dotenv.config();

import jwt from "jwt-simple";
const secret: string | undefined = process.env.JWT_SECRET;

export const addAttendance = async (req: any, res: any) => {
  try {
    const { user, totalTimeShift } = req.body;
    if (!totalTimeShift) throw new Error("no shift time");
    if (!user) throw new Error("no user");

    const updateUser = await EmployeeModel.findByIdAndUpdate(
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

export const getSelectedEmployee = async (req: any, res: any) => {
  try {
    const { idNumber } = req.body;
    if (!idNumber) throw new Error("no id");

    const employeeDB: any = await EmployeeModel.find({
      idNumber: idNumber,
    })
      .populate("role")
      .exec();

    res.send({ employeeDB });
  } catch (error: any) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
};

/** Receives a string of role type from client and returns data of the employees in that role. */
export const getEmployeesByRoleType = async (req: any, res: any) => {
  try {
    const { roleType } = req.body;
    if (!roleType) throw new Error("no role type received from client.");

    const roleTypeId = await RoleModel.find({ name: roleType }).select("_id");

    const employees = await EmployeeModel.find({ role: roleTypeId });

    res.status(200).send({ ok: true, employees });
  } catch (error) {
    console.log(error);
    res.status(500).send("did not receive data from DB.");
  }
};
