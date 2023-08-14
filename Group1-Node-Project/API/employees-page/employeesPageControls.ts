import express from "express";
import ManagerModel from "../manager/managerModel";
import EmployeeModel from "../employee/employeeModel";
import RoleModel from "../role/roleModel";

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

    // if (role) {
    //   const roleID = await RoleModel.find({ name: role });
    //   // .select({ _id: 1 });
    //   // role = roleID[0]._id.toString();
    // }

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
export const displayWorkers = async (req: any, res: any) => {
  try {
    const { _id, role } = req.body;

    let query = {};

    if (role) {
      const roleObj = await RoleModel.findOne({ name: role });

      if (!roleObj) {
        console.log(`Role ${roleObj} not found`);
      }

      query = { role: roleObj!._id };
    }

    const employees = await ManagerModel.findById(_id).populate("employees");
    if (employees) console.log(employees.employees);

    const employeesRole = await EmployeeModel.find(query).populate(
      "role",
      "name"
    );

    res.send({ employees, employeesRole });
  } catch (error) {
    console.log(error);
  }
};
