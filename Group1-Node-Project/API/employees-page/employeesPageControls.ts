import express from "express";
import AdminModel from "../admin/adminModel";
import ManagerModel from "../manager/managerModel";
import EmployeeModel from "../employee/employeeModel";
import RoleModel from "../role/roleModel";
import CompanyModel from "../company/companyModel";
import mongoose from "mongoose";
import { ObjectId } from "mongoose";

export const addEmployee = async (req: any, res: any) => {
  try {
    const {
      name,
      email,
      password,
      idNumber,
      phone,
      birthday,
      salaryPerHour,
      role,
      managerID,
    } = req.body;

    console.log(managerID);
    const selectedRole = await RoleModel.findOne({ name: role }).select("_id");

    if (!selectedRole) {
      throw new Error("Role not found");
    }

    const employeeDB = await EmployeeModel.create({
      name,
      email,
      password,
      idNumber,
      phone,
      birthday,
      salaryPerHour,
      role: selectedRole._id,
    });

    console.log(employeeDB);

    const newUserId = await EmployeeModel.find({ idNumber: idNumber }).select({
      _id: 1,
    });

    const newUserIdString = managerID.toString();
    const managerIdString = newUserId[0]._id.toString();

    const updateManager = await ManagerModel.findByIdAndUpdate(
      managerID,
      { $push: { employees: newUserId[0]._id } },
      { new: true }
    );

    const managerDB = await ManagerModel.findById(managerID)
      .populate({
        path: "employees",
        populate: {
          path: "role",
          model: "Role",
        },
      })
      .exec();

    console.log(managerDB);

    res.status(200).send({ ok: true, managerDB });
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

export const getMyTeam = async (req: any, res: any) => {
  try {
    const { _id } = req.body;

    console.log(_id);
    const stringID = _id.toString();
    // const manager = await ManagerModel.findOne({
    //   employees: { $eq: stringID },
    // });

    const manager = await ManagerModel.findOne({
      employees: { $eq: [stringID] },
    }).populate("employees");
    console.log(manager);

    // if (manager) console.log(manager._id);
    // const managerID = manager?._id;

    // const managerDB = await ManagerModel.findById(managerID)
    //   .populate({
    //     path: "employees",

    //     populate: {
    //       path: "role",
    //       model: "Role",
    //     },
    //   })
    //   .exec();

    // console.log(managerDB);

    // res.send({ managerDB });
  } catch (error) {
    console.log(error);
  }
};
