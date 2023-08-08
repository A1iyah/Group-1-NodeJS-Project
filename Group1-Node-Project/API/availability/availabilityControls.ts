import express from "express";
import { WeekModel } from "./availabilityModel";

export const updateAvailability = async (req: any, res: any) => {
  try {
    const _id = req.params._id;
    const { weekData } = req.body;

    await WeekModel.findOneAndUpdate({ _id }, weekData, { upsert: true });

    res.status(200).send("Availability updated successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating availability");
  }
};
