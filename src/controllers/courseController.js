import { StatusCodes } from "http-status-codes";

import { addStudentsToCourseSerivice, createCourseService, getAllFacultyCoursesService, getCourseWithStudentsDetailsService } from "../services/courseServices.js";
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

export const addStudentsToCourseController = async (req, res) => {
    try {
        
        const response = await addStudentsToCourseSerivice(req.body.courseId, req.body.studentsIds, req.user);
        return res.status(StatusCodes.OK).json(successResponse({
            data: response,
            message: 'Students added successfully'
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


export const getAllFacultyCoursesController = async (req, res) => {
    try {
        const response = await getAllFacultyCoursesService(req.user);
        return res.status(StatusCodes.OK).json(successResponse({
            data: response,
            message: 'courses fetched successfully'
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

export const getCourseWithStudentsDetailsController = async (req, res) => {
    try {
        const response = await getCourseWithStudentsDetailsService(req.params.courseId);
        return res.status(StatusCodes.OK).json(successResponse({
            data: response,
            message: 'courses with student details successfully'
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