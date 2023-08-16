import express from "express";
import WeekScheduleModel from "./scheduleModel";
import EmployeeModel from "../employee/employeeModel";
import { Types } from "mongoose";

export const createNewWeekSchedule = async () =>
{
    const weekSchedule = new WeekScheduleModel();
   
    const result = await weekSchedule.save();

}  

export const getAllWeekSchedules = async (req: any, res: any) =>
{
    try {
        try {
            const weekSchedules = await WeekScheduleModel.find({});
            if (!weekSchedules) throw new Error("No week schedules found in DB.");        

            res.status(200).send({ok: true, weekSchedules});
        } catch (error) {
            console.log(error);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Did not get week schedules data.");
    }
}

export const createNewWeekForScheduling = async (req: any, res: any) =>
{
    const {nextSunday, cashierCount, salesCount } = req.body;
    
    try {
        const weekSchedule = await WeekScheduleModel.create(
            {
                startDate: getNextSunday(),
                scheduleRequirements: [{
                    
                        roleType: "Shift Manager",
                        numEmployeesRequired: 1
                        },
                        {
                          roleType: "Cashier",
                            numEmployeesRequired: cashierCount
                        },
                        {
                            roleType: "Sales",
                            numEmployeesRequired: salesCount
                        
                }]
            
            }
        ); 

        res.status(200).send({ok: true, weekSchedule});
        
    } catch (error) {
        
    }

}

const getNextSunday = ():Date =>
{
    const todayDate: Date = new Date();
    const date = new Date(todayDate.getFullYear(), todayDate.getMonth(), (todayDate.getDate()-todayDate.getDay())+7);

    return date;
}

export const addEmployeeToSchedule = async (req: any, res: any) =>
{
    try {
        const { thisScheduleId, employeeId, weekdayIndex } = req.body;
        
        if (!thisScheduleId || !employeeId || !weekdayIndex) throw new Error("did not receive all data from client");

        const weekdayName = convertWeekdayIndexToWeekdayName(weekdayIndex);
        console.log("weekdayName: ", weekdayName);
        

        //const targetSchedule = await WeekScheduleModel.findByIdAndUpdate(thisScheduleId, {weekdayName : {$push: {employeeId: employeeId}}});

        const employeeIdObj = await EmployeeModel.findById(employeeId)[0]._id.toString();

        console.log(employeeIdObj);
        
    
        const targetSchedule = await WeekScheduleModel.indByIdAndUpdate(
            thisScheduleId,
            {$push: {weekdayName: employeeIdObj}
        });

        //const targetSchedule = WeekScheduleModel.findById(thisScheduleId).populate();

        // const updatedSchedule = await WeekScheduleModel.findById(thisScheduleId).populate(
        //     {
        //         path: weekdayName,
        //         populate: {path: 'EmployeeModel'}
        //     }
        // )

        res.status(200).send({ok: true});
    } catch (error) {
        console.log(error);
        res.status(500).send("Did not get data");
    }
}

const convertWeekdayIndexToWeekdayName = (weekdayIndex: string): string =>
{
    switch (weekdayIndex) {
        case "0":
            return "sunday";
        break;

        case "1":
            return "monday";
        break;
        
        case "2":
            return "tuesday";
        break;

        case "3":
            return "wednesday";
        break;

        case "4":
            return "thursday";
        break;

        case "5":
            return "friday";
        break;

        case "6":
            return "saturday";    
        break;

        default:
            return "";
    }
}
