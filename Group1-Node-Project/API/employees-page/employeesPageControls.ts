import express from "express";
import AdminModel from "../admin/adminModel";
import ManagerModel from "../manager/managerModel";
import EmployeeModel from "../employee/employeeModel";
import RoleModel from "../role/roleModel";

// export const addEmployee = async (
//   req: any,
//   res: any,
//   name: string,
//   email: string,
//   password: string,
//   idNumber: number,
//   phone: number,
//   birthday: Date,
//   salaryPerHour: number,
//   roleName: string
// ) => {
//   try {
//     const role = await RoleModel.findOne({ name: roleName });
//     if (!roleName) {
//       console.log(`Role ${roleName} not found`);
//       return;
//     }

//     const employeeDB = await EmployeeModel.create({
//       name,
//       email,
//       password,
//       idNumber,
//       phone,
//       birthday,
//       salaryPerHour,
//       role: role?._id,
//     });

//     const result = await employeeDB.save();

//     res.status(200).send({ ok: true, result });
//   } catch (error) {
//     console.log(error);
//   }
// };

export const addEmployee = async (req: any, res: any) => {
  try {
    let {
      name,
      email,
      password,
      idNumber,
      phone,
      birthday,
      salaryPerHour,
      role,
    } = req.body;

    const employeeDB = await EmployeeModel.create({
      name,
      email,
      password,
      idNumber,
      phone,
      birthday,
      salaryPerHour,
      role: role._id,
    });
    console.log(employeeDB);

    console.log("Received role id:", role._id);

    res.status(200).send({ ok: true, employeeDB });
  } catch (error) {
    console.log(error);
    res.status(500).send("did not get data");
  }
};

export const addManager = async (req: any, res: any) => {
  try {
    let {
      name,
      email,
      password,
      idNumber,
      phone,
      birthday,
      salaryPerHour,
      role,
    } = req.body;

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
      salaryPerHour,
      role,
    });
    console.log(managerDB);

    res.status(200).send({ ok: true, managerDB });
  } catch (error) {
    console.log(error);
    res.status(500).send("did not get data");
  }
};

// Display all workers -
export const getAdminWorkers = async (req: any, res: any) => {
  try {
    const { _id } = req.body;

    const allWorkers = await AdminModel.findById(_id)
      .populate({
        path: "managers",
        populate: {
          path: "role",
          model: "Role",
        },
      })

      .populate({
        path: "employees",
        populate: {
          path: "role",
          model: "Role",
        },
      })
      .exec();

    console.log(allWorkers);

    res.send({ allWorkers });
  } catch (error) {
    console.log(error);
  }
};

export const getManagerEmployees = async (req: any, res: any) => {
  try {
    const { _id } = req.body;

    const employees = await ManagerModel.findById(_id).populate({
      path: "employees",
      populate: { path: "role", model: "Role" },
    });

    if (employees) console.log(employees.employees);

    res.send({ employees });
  } catch (error) {
    console.log(error);
  }
};
