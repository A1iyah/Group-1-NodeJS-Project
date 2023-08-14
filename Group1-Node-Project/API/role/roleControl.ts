import RoleModel from "./roleModel";
import ManagerModel from "../manager/managerModel";
import EmployeeModel from "../employee/employeeModel";
import CompanyModel from "../company/companyModel";
import AdminModel from "../admin/adminModel";
import availability from "../availability/availabilityModel";

export const getRoleIdByName = async (req: any, res: any) =>
{
    try {
        const { targetName } = req.body;

        console.log("server target: ", targetName);

        try {
            if (!targetName) throw new Error("no id of role received from client");
            
            const roleId = await RoleModel.find({name: targetName}).select("_id");

            res.status(200).send({ok: true, roleId});

        } catch (error) {
            console.log(error);
        }

    } catch (error) {
        console.log(error);
        res.status(500).send("Did not get data");
        
    }
}