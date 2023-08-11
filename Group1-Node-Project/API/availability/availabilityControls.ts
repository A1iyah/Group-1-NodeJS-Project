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
          "64d60d29de7623321f11abd3",
          { $push: { [day]: userId } },
          { new: true }
        );
      }
    }

    if (commentValue) {
      const update = await WeekModel.findByIdAndUpdate(
        "64d60d29de7623321f11abd3",
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
    const week = await WeekModel.findById("64d60d29de7623321f11abd3");
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
