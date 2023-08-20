import AdminModel from "./adminModel";
import ManagerModel from "../manager/managerModel";
import RoleModel from "../role/roleModel";
import EmployeeModel from "../employee/employeeModel";
import CompanyModel from "../company/companyModel";
import availability from "../availability/availabilityModel";
import jwt from "jwt-simple";
import * as dotenv from "dotenv";
dotenv.config();

const secret: string | undefined = process.env.JWT_SECRET as string;


export const getSelectedSalaryUp = async (req: any, res: any) => {
  try {
    const { salaryUp, _id } = req.body;

    const employees = await AdminModel.findById(_id)
      .populate({
        path: "managers",
        match: {
          salaryPerHour: { $gt: salaryUp },
        },
        populate: {
          path: "role",
          model: "Role",
        },
      })

      .populate({
        path: "employees",
        match: {
          salaryPerHour: { $gt: salaryUp },
        },
        populate: {
          path: "role",
          model: "Role",
        },
      });

    res.send({ employees });
  } catch (error) {
    console.log(error);
  }
};

export const getSelectedSalaryDown = async (req: any, res: any) => {
  try {
    const { salaryDown, _id } = req.body;

    const employees = await AdminModel.findById(_id)
      .populate({
        path: "managers",
        match: {
          salaryPerHour: { $lt: salaryDown },
        },
        populate: {
          path: "role",
          model: "Role",
        },
      })

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

    const employees = await AdminModel.findById(_id)
      .populate({
        path: "managers",
        match: {
          salaryPerHour: { $gte: minSalary, $lte: maxSalary },
        },
        populate: {
          path: "role",
          model: "Role",
        },
      })

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
    const employees = await AdminModel.findById("64de1def9cd3eed4fd4903e0")
      .populate("employees")
      .exec();

    res.send({ employees });
  } catch (error: any) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
};

export const getManagersList = async (req: any, res: any) => {
  try {
    const managers = await AdminModel.findById("64de1def9cd3eed4fd4903e0")
      .populate("managers")
      .exec();

    res.send({ managers });
  } catch (error: any) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
};
