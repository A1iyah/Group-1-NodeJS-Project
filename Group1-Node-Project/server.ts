import express from "express";
import mongoose, { Schema } from "mongoose";
import * as dotenv from "dotenv";
// import usersRoute from "./API/usersRoute";
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

// app.use("/api/", usersRoute);

app.listen(3000, () => {
  console.log("server listen on port 3000");
});
