import express from "express";
import WeekScheduleModel from "./scheduleModel";

export const createNewWeekSchedule = async () =>
{
    const weekSchedule = new WeekScheduleModel();
   
    const result = await weekSchedule.save();

    console.log(result);
    
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
    console.log("reached server!");
    
    console.log(nextSunday);
    
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
    console.log(date);
    

    return date;
}