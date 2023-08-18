import EmployeeModel from "./employeeModel";
import ManagerModel from "../manager/managerModel";
import RoleModel from "../role/roleModel";
import CompanyModel from "../company/companyModel";
import AdminModel from "../admin/adminModel";
import availability from "../availability/availabilityModel";
import * as dotenv from "dotenv";
dotenv.config();

import jwt from "jwt-simple";
const secret: string | undefined = process.env.JWT_SECRET;
console.log("secret:", secret);

// const secret: string = "secret";

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
    console.log(user);

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

// export const addEmployee = async (req: any, res: any) => {
//   try {
//     let { name, email, password, idNumber, phone, birthday, salary, role } =
//       req.body;
//     if (role) {
//       const roleID = await RoleModel.find({ name: role }).select({ _id: 1 });
//       role = roleID[0]._id.toString();
//     }
//     const employeeDB = await EmployeeModel.create({
//       name,
//       email,
//       password,
//       idNumber,
//       phone,
//       birthday,
//       salary,
//       role,
//     });
//     console.log(employeeDB);
//     res.status(200).send({ ok: true });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send("did not get data");
//   }
// };
