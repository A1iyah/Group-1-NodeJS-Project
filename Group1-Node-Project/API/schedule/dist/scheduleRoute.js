"use strict";
exports.__esModule = true;
var express_1 = require("express");
var scheduleControl_1 = require("./scheduleControl");
var weekScheduleRouter = express_1["default"].Router();
weekScheduleRouter
    .get("/get-all-week-schedules", scheduleControl_1.getAllWeekSchedules)
    .post("/create-new-week-for-scheduling", scheduleControl_1.createNewWeekForScheduling)
    .patch("/add-employee-to-schedule", scheduleControl_1.addEmployeeToSchedule)
    .get("/get-next-week-schedule", scheduleControl_1.getNextWeekSchedule);
exports["default"] = weekScheduleRouter;
