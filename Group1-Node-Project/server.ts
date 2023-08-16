import express from "express";
import mongoose, { Schema } from "mongoose";
import * as dotenv from "dotenv";
import adminRoute from "./API/admin/adminRoute";
import availabilityRoute from "./API/availability/availabilityRoute";
import companyRoute from "./API/company/companyRoute";
import employeeRoute from "./API/employee/employeeRoute";
import managerRoute from "./API/manager/managerRoute";
import roleRoute from "./API/role/roleRoute";
import weekScheduleRouter from "./API/schedule/scheduleRoute";
import employeesPageRoute from "./API/employees-page/employeesPageRoute";
import cookieParser from "cookie-parser";

dotenv.config();

const uri: string | undefined = process.env.MONGOOSE_URI + "Node-Team-Project";

if (uri) {
  mongoose
    .connect(uri)
    .then(() => console.log("DB connected"))
    .catch((err) => console.log("DB error :", err));
} else {
  console.log("No URI");
}

const app = express();
app.use(express.json());
app.use(cookieParser());

// static file
app.use(express.static("./client"));

app.use("/api/admin/", adminRoute);
app.use("/api/company/", companyRoute);
app.use("/api/employee/", employeeRoute);
app.use("/api/manager/", managerRoute);
app.use("/api/role/", roleRoute);
app.use("/api/availability/", availabilityRoute);
app.use("/api/schedule/", weekScheduleRouter);
app.use("/api/employees-page", employeesPageRoute);

app.listen(3000, () => {
  console.log("server listen on port 3000");
});
