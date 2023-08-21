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

    const newUserId = await EmployeeModel.find({ idNumber: idNumber }).select({
      _id: 1,
    });

    const managerIdString = managerID.toString();
    const newUserIdString = newUserId[0]._id.toString();

    const updateManager = await ManagerModel.findByIdAndUpdate(
      managerID,
      { $push: { employees: newUserId[0]._id } },
      { new: true }
    );

    const updateAdmin = await AdminModel.findByIdAndUpdate(
      "64de1def9cd3eed4fd4903e0",
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

    const companyDB = await CompanyModel.create({
      originalID: newUserId[0]._id,
      systemRole: "Employee",
      email: email,
      password: password,
    });

    res.status(200).send({ ok: true, managerDB });
  } catch (error) {
    console.log(error);
    res.status(500).send("did not get data");
  }
};

export const addManager = async (req: any, res: any) => {
  try {
    let { name, email, password, idNumber, phone, birthday, salaryPerHour } =
      req.body;

    const managerRole = await RoleModel.findOne({ name: "Manager" }).select(
      "_id"
    );

    if (!managerRole) {
      throw new Error("Role not found");
    }

    const managerDB = await ManagerModel.create({
      name,
      email,
      password,
      idNumber,
      phone,
      birthday,
      salaryPerHour,
      role: managerRole._id,
    });

    const updateAdmin = await AdminModel.findByIdAndUpdate(
      "64de1def9cd3eed4fd4903e0",
      { $push: { managers: managerDB._id } },
      { new: true }
    );

    const adminDB = await AdminModel.findById("64de1def9cd3eed4fd4903e0")
      .populate({
        path: "employees",
        populate: {
          path: "role",
          model: "Role",
        },
      })
      .populate({
        path: "managers",
        populate: {
          path: "role",
          model: "Role",
        },
      })
      .exec();

    const companyDB = await CompanyModel.create({
      originalID: managerDB._id,
      systemRole: "Manager",
      email: email,
      password: password,
    });

    res.status(200).send({ ok: true, adminDB });
  } catch (error) {
    console.log(error);
    res.status(500).send("did not get data");
  }
};

// Delete employee -
export const deleteEmployee = async (req: any, res: any) => {
  try {
    const { _id } = req.body;
    if (!_id) throw new Error("No employee ID found.");

    await EmployeeModel.findByIdAndDelete(_id);

    const manager = await ManagerModel.findOneAndUpdate(
      { employees: _id },
      { $pull: { employees: _id } },
      { new: true }
    );

    const admin = await AdminModel.findOneAndUpdate(
      { employees: _id },
      { $pull: { employees: _id } },
      { new: true }
    );

    await CompanyModel.findOneAndDelete({ originalID: _id });

    res.send({ ok: true });
  } catch (error) {
    console.log(error);
    res.status(500).json("Server delete employee error");
  }
};

// DeleteManager
export const deleteManager = async (req: any, res: any) => {
  try {
    const { _id } = req.body;
    if (!_id) throw new Error("No employee ID found.");

    await ManagerModel.findByIdAndDelete(_id);

    const admin = await AdminModel.findOneAndUpdate(
      { managers: _id },
      { $pull: { managers: _id } },
      { new: true }
    );

    await CompanyModel.findOneAndDelete({ originalID: _id });

    res.send({ ok: true });
  } catch (error) {
    console.log(error);
    res.status(500).json("Server delete employee error");
  }
};

// Display all workers -
export const getAdminEmployees = async (req: any, res: any) => {
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

    res.send({ employees });
  } catch (error) {
    console.log(error);
  }
};

export const getMyTeam = async (req: any, res: any) => {
  try {
    const { _id } = req.body;

    const stringID = _id.toString();

    const manager = await ManagerModel.findOne({
      employees: _id,
    })
      .populate({
        path: "employees",
        populate: {
          path: "role",
          model: "Role",
        },
      })
      .exec();

    const myTeamEmployees = manager?.employees;

    res.send({ myTeamEmployees });
  } catch (error) {
    console.log(error);
  }
};
