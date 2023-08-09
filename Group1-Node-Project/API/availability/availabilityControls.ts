import express from "express";
import { WeekModel } from "./availabilityModel";

export const updateAvailability = async (req: any, res: any) => {
  try {
    console.log(req.body);
    const { availabilityData, commentValue, userId } = req.body;
    // console.log(userId);

    const updateObject: any = {};

    // Loop through each day in availabilityData
    for (const day in availabilityData) {
      if (availabilityData[day]) {
        // console.log(day);

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

    res.status(200).send("Availability updated successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating availability");
  }
};
