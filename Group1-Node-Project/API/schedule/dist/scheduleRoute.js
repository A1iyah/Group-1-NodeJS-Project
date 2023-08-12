"use strict";
exports.__esModule = true;
var express_1 = require("express");
var scheduleControl_1 = require("./scheduleControl");
var weekScheduleRouter = express_1["default"].Router();
weekScheduleRouter
    .get("/get-all-week-schedules", scheduleControl_1.getAllWeekSchedules)
    .post("/create-new-week-for-scheduling", scheduleControl_1.createNewWeekForScheduling);
exports["default"] = weekScheduleRouter;
