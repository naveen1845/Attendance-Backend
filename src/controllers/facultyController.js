import { facultySignUpService } from "../services/facultyServices.js";

export const facultySignUpController = async (req, res) => {
    try {
        const newfaculty = await facultySignUpService(req.body);
        res.send({
            Status: 'Success',
            data: newfaculty
        })
    } catch (error) {
        console.log(error);
        
    }
}