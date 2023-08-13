import express from "express";
import ManagerModel from "../manager/managerModel";
import EmployeeModel from "../employee/employeeModel";
import RoleModel from "../role/roleModel";

export const addEmployee = async (req: any, res: any) => {
  try {
    let { name, email, password, idNumber, phone, birthday, salary, role } =
      req.body;

    if (role) {
      const roleID = await RoleModel.find({ name: role }).select({ _id: 1 });
      role = roleID[0]._id.toString();
    }

    const employeeDB = await EmployeeModel.create({
      name,
      email,
      password,
      idNumber,
      phone,
      birthday,
      salary,
      role,
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
      nameM,
      emailM,
      passwordM,
      idNumberM,
      phoneM,
      birthdayM,
      salaryM,
      roleM,
    } = req.body;

    if (roleM) {
      const roleID = await RoleModel.find({ name: roleM }).select({ _id: 1 });
      roleM = roleID[0]._id.toString();
    }

    const managerDB = await ManagerModel.create({
      nameM,
      emailM,
      passwordM,
      idNumberM,
      phoneM,
      birthdayM,
      salaryM,
      roleM,
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
    const { _id } = req.body;

    const employees = await ManagerModel.findById(_id).populate("employees");

    if (employees) console.log(employees.employees);

    res.send({ employees });
  } catch (error) {
    console.log(error);
  }
};
