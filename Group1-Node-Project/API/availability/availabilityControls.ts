import express from "express";
import moment from "moment";
import { WeekModel, DayModel } from "./availabilityModel";
import { populate } from "dotenv";
let roleString: string;

export const updateAvailability = async (req: any, res: any) => {
  try {
    let weekData = await WeekModel.find({});
    if (!weekData) throw new Error("no week found in DB");

    const { availabilityData, commentValue, userId, role, name } = req.body;
    console.log(availabilityData, commentValue, userId, role, name);

    // switch (role) {
    //   case 0:
    //     roleString = "Admin";
    //   break;
    //   case 1:
    //     roleString = "Manager";
    //   break;
    //   case 2:
    //     roleString = "Employee";
    //   break;
    // }

    const updateObject: any = {};

    //Loop through each day in availabilityData
    for (const day in availabilityData) {
      if (availabilityData[day]) {
        const update = await WeekModel.findByIdAndUpdate(
          "64dfb738d323ba64e4bd030e",
          {
            $push: {
              [day]: {
                employeeId: userId,
                name: name,
                role: role.userRole,
                comment: commentValue,
              },
            },
          }
        );
      }
    }

    // Get date
    const { sunday, saturday } = getCurrentWeekDates();

    res.status(200).json({
      message: "Availability updated successfully",
      weekDates: {
        sunday: sunday.format("D.M"),
        saturday: saturday.format("D.M"),
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating availability");
  }
};

// Get date -
function getCurrentWeekDates() {
  const today = moment();
  const sunday = today.clone().startOf("week").add(0, "days");
  const saturday = today.clone().startOf("week").add(6, "days");

  return { sunday, saturday };
}

export const getAllAvailableEmployees = async (req: any, res: any) => {
  try {
    const weekDays = await WeekModel.find({});

    res.status(200).send({ ok: true, weekDays });
  } catch (error) {
    console.log(error);
    res.status(500).send("Did not get data.");
  }
};

export const getAllAvailableWeeks = async (req: any, res: any) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(500).send("Did not get data.");
  }
};

export const getEmployeesByRoleAndWeekday = async (req: any, res: any) => {
  let day: string = "";

  try {
    const { role, weekday } = req.body;

    if (weekday === 0) day = "sundayMorning";
    if (weekday === 1) day = "mondayMorning";
    if (weekday === 2) day = "tuesdayMorning";
    if (weekday === 3) day = "wednesdayMorning";
    if (weekday === 4) day = "thursdayMorning";
    if (weekday === 5) day = "fridayMorning";
    if (weekday === 6) day = "saturdayMorning";

    try {
      //if (!role) throw new Error("did not received role from client");
      //if (!weekday) throw new Error("did not received weekday from client");

      const employees = await WeekModel.find({}).select(day);

      res.status(200).send({ ok: true, employees });
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    res.status(500).send("Did not find data");
  }
};

export const getCommentByEmployeeIdAndWeekday = async (req: any, res: any) => {
  let day: string = "";

  try {
    const { employeeId, weekdayIndex } = req.body;

    if (weekdayIndex === "0") day = "sundayMorning";
    if (weekdayIndex === "1") day = "mondayMorning";
    if (weekdayIndex === "2") day = "tuesdayMorning";
    if (weekdayIndex === "3") day = "wednesdayMorning";
    if (weekdayIndex === "4") day = "thursdayMorning";
    if (weekdayIndex === "5") day = "fridayMorning";
    if (weekdayIndex === "6") day = "saturdayMorning";

    try {
      //const comment = await WeekModel.find({}).select(day).findById(employeeId).select("comment");

      const dayDB = await WeekModel.findOne({}).select(day);

      if (!dayDB) throw new Error("no day found on DB");

      res.status(200).send({ ok: true, dayDB });
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    res.status(500).send("Did not find data");
  }
};
