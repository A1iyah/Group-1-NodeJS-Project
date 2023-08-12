import express from "express";
import moment from "moment";
import { WeekModel } from "./availabilityModel";

export const updateAvailability = async (req: any, res: any) => {
  try {
    console.log(req.body);
    const { availabilityData, commentValue, userId } = req.body;

    const updateObject: any = {};

    // Loop through each day in availabilityData
    for (const day in availabilityData) {
      if (availabilityData[day]) {
        const update = await WeekModel.findByIdAndUpdate(
          "64d38a0680e3dcb7fbd1a67b",
          { $push: { [day]: userId } },
          { new: true }
        );
      }
    }

    if (commentValue) {
      const update = await WeekModel.findByIdAndUpdate(
        "64d38a0680e3dcb7fbd1a67b",
        {
          $push: {
            comment: {
              user: userId,
              comment: commentValue,
            },
          },
        },
        { new: true }
      );
    }
    const week = await WeekModel.findById("64d38a0680e3dcb7fbd1a67b");
    console.log(week);

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

export const getAllAvailableEmployees = async (req: any, res: any) =>
{
  try {
    console.log("called");
    

    const weekDays = await WeekModel.find({});

    res.status(200).send({ok:true, weekDays});
    
  } catch (error) {
    console.log(error);
    res.status(500).send("Did not get data.");
    
  }
}

export const getAllAvailableWeeks = async (req: any, res: any) =>
{
  try {
    
  } catch (error) {
    console.log(error);
    res.status(500).send("Did not get data.");
    
  }
}

export const getEmployeesByRoleAndWeekday = async (req: any, res: any) =>
{
  let day: string = "";
  console.log(req.body);
  
  try {
    const { role, weekday } = req.body;
    
    
    
    if (weekday === 0) day = "sundayMorning";
    if (weekday === 1) day = "modayMorning";
    if (weekday === 2) day = "thuesdayMorning";
    if (weekday === 3) day = "wednesdayMorning";
    if (weekday === 4) day = "thursdayMorning";
    if (weekday === 5) day = "fridayMorning";
    if (weekday === 6) day = "saturdayMorning";

    try {
      //if (!role) throw new Error("did not received role from client");
      //if (!weekday) throw new Error("did not received weekday from client");

      const employees = await WeekModel.find({}).select(day);
      
      res.status(200).send({ok: true, employees })
    } catch (error) {
      console.log(error);
      
    }
    
  } catch (error) {
    res.status(500).send("Did not find data");
    
  }
}