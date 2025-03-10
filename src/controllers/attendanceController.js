import { StatusCodes } from "http-status-codes";

import { createAttendaceService } from "../services/attendanceServices.js";
import { CustomErrorResponse, successResponse } from "../utils/common/responseObjects.js";

export const createAttendaceController = async (req, res) => {
    try {
        const courseId = req.body.courseId;
        const date = req.body.date;
        const attendanceData = req.body.attendanceData;

        const attendance = await createAttendaceService(courseId, date, attendanceData);

        return res.status(StatusCodes.OK).json(successResponse({
            data: attendance,
            message: 'attendance created successfully'
        }))
    } catch (error) {
        console.log(error);
        if (error.statusCode) {
            return res.status(error.statusCode).json(CustomErrorResponse(error));
        }
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
}