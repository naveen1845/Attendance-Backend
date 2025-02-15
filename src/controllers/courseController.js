import { StatusCodes } from "http-status-codes";

import { createCourseService } from "../services/courseServices.js";
import { CustomErrorResponse, successResponse } from "../utils/common/responseObjects.js";

export const createCourseController = async (req, res) => {
    try {
        const newCourse = await createCourseService(req.body, req.user)
        return res.status(StatusCodes.CREATED).json(successResponse({
            data: newCourse,
            message: 'New Course Created Successfully'
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