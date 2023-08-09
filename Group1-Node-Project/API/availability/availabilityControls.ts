import express from "express";
import { WeekModel } from "./availabilityModel";

export const updateAvailability = async (req: any, res: any) => {
  try {
    console.log(req.body);
    const { availabilityData, commentValue, userId } = req.body;
    // const userId = req.body;

    const updateObject: any = {};

    // Loop through each day in availabilityData
    for (const day in availabilityData) {
      if (availabilityData[day]) {
        updateObject[day] = [userId];
      } else {
        updateObject[day] = [];
      }
    }

    // Set the comment
    updateObject.comment = commentValue;

    await WeekModel.findOneAndUpdate({}, updateObject);
    console.log(updateObject);

    res.status(200).send("Availability updated successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating availability");
  }
};

// export const updateAvailability = async (req: any, res: any) => {
//   try {
//     console.log(req.body);
//     const { availabilityData, commentValue } = req.body;

//     const weekData: any = {
//       sunday: [],
//       monday: [],
//       tuesday: [],
//       wednesday: [],
//       thursday: [],
//       friday: [],
//       saturday: [],
//     };

//     // Loop through the days in availabilityData
//     for (const day in availabilityData) {
//       if (availabilityData[day]) {
//         weekData[day].push(_id);
//       }
//     }

//     // Add the comment
//     weekData.comment = [commentValue];

//     await WeekModel.findOneAndUpdate({ _id }, weekData, { upsert: true });

//     res.status(200).send("Availability updated successfully");
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Error updating availability");
//   }
// };
