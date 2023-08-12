import mongoose, { Schema } from "mongoose";
import EmployeeModel from "../employee/employeeModel";

const weekScheduleSchema = new Schema(
    {
        startDate: Date,
        isOpenForAllocation: {type: Boolean, default: true},
        scheduleRequirements: [{
            
                 roleType: {type: String, enum: ["Shift Manager", "Cashier", "Sales"]},
                numEmployeesRequired: {type: Number, default: 1}
        }],
        sunday: [{type: Schema.Types.ObjectId, ref: EmployeeModel}],
        monday: [{type: Schema.Types.ObjectId, ref: EmployeeModel}],
        tuesday: [{type: Schema.Types.ObjectId, ref: EmployeeModel}],
        wednesday: [{type: Schema.Types.ObjectId, ref: EmployeeModel}],
        thursday: [{type: Schema.Types.ObjectId, ref: EmployeeModel}],
        friday: [{type: Schema.Types.ObjectId, ref: EmployeeModel}],
        saturday:[{type: Schema.Types.ObjectId, ref: EmployeeModel}]
    }
)

const WeekScheduleModel = mongoose.model("WeekSchedule", weekScheduleSchema);

export default WeekScheduleModel;