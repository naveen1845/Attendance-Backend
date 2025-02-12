import { facultySignUpService } from "../services/facultyServices.js";
import { CustomErrorResponse } from "../utils/common/responseObjects.js";

export const facultySignUpController = async (req, res) => {
    try {
        const newfaculty = await facultySignUpService(req.body);
        res.send({
            Status: 'Success',
            data: newfaculty
        })
    } catch (error) {
        if (error.statusCode) {
            return res.status(error.statusCode).json(CustomErrorResponse(error));
        }
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
}