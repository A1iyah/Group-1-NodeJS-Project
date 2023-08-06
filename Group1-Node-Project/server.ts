import express from "express";
import mongoose, { Schema } from "mongoose";
import * as dotenv from "dotenv";
import companyRoute from "./API/companyRoute";
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

app.use("/api/", companyRoute);

// async function createAdmin(
//   idNumber: number,
//   name: string,
//   password: string,
//   email: string,
//   phone: number
// ) {
//   const admin = new AdminModel({ idNumber, name, password, email, phone });
//   const result = await admin.save();
//   console.log(result);
// }

// createAdmin(123456789, "admin", "123", "admin@gmail.com", 972506254875);

app.listen(3000, () => {
  console.log("server listen on port 3000");
});
