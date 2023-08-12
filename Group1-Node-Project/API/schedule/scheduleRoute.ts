import express from "express";
import {
    getAllWeekSchedules,
    createNewWeekForScheduling,
} from "./scheduleControl";

const weekScheduleRouter = express.Router();

weekScheduleRouter
.get("/get-all-week-schedules", getAllWeekSchedules)
.post("/create-new-week-for-scheduling", createNewWeekForScheduling);


export default weekScheduleRouter;
