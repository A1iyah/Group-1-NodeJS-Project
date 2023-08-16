import express from "express";
import {
    getAllWeekSchedules,
    createNewWeekForScheduling,
    addEmployeeToSchedule,
} from "./scheduleControl";

const weekScheduleRouter = express.Router();

weekScheduleRouter
.get("/get-all-week-schedules", getAllWeekSchedules)
.post("/create-new-week-for-scheduling", createNewWeekForScheduling)
.patch("/add-employee-to-schedule", addEmployeeToSchedule);


export default weekScheduleRouter;
