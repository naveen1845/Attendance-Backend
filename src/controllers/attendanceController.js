import { StatusCodes } from "http-status-codes";

import { createAttendaceService, getAttendaceDetailsService, getCourseAttendanceRecordsService, updateAttendanceService } from "../services/attendanceServices.js";
import { CustomErrorResponse, successResponse } from "../utils/common/responseObjects.js";

export const createAttendaceController = async (req, res) => {
    try {
        const courseId = req.body.courseId;

        const attendance = await createAttendaceService(courseId);

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

export const getCourseAttendanceRecordsController =  async (req, res) => {
    try {
        const courseId = req.query.courseId;
        const attendances = await getCourseAttendanceRecordsService(courseId, req.body.startDate || new Date(0), req.body.endDate || new Date());
        return res.status(StatusCodes.OK).json(successResponse({
            data: attendances,
            message: 'attendances fetched successfully'
        }))
    } catch (error) {
        console.log("getCourseAttendanceRecordsController: ",error);
        if (error.statusCode) {
            return res.status(error.statusCode).json(CustomErrorResponse(error));
        }
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
}

export const getAttendaceDetailsController = async (req, res) => {
    try {
        const attendances = await getAttendaceDetailsService(req.params.attendanceId);
        return res.status(StatusCodes.OK).json(successResponse({
            data: attendances,
            message: 'attendance details fetched successfully'
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

export const updateAttendanceController = async (req, res) => {
    try {
        const updatedAttendace = await updateAttendanceService(req.params.attendanceId, req.body.studentsAttendance);
        return res.status(StatusCodes.OK).json(successResponse({
            data: updatedAttendace,
            message: 'attendance updated successfully'
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