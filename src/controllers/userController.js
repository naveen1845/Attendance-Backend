import { StatusCodes } from "http-status-codes";

import { getAllStudentsService, userSignInService, userSignUpService } from "../services/userServices.js";
import { CustomErrorResponse, successResponse } from "../utils/common/responseObjects.js";

export const userSignUpController = async (req, res) => {
    try {
        const newuser = await userSignUpService(req.body);
        return res.status(StatusCodes.CREATED).json(successResponse(newuser, "user Signed Up"))
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

export const userSignInController = async (req, res) => {
    try {
        const user = await userSignInService(req.body);
        return res.status(StatusCodes.CREATED).json(successResponse(user, "user Signed IN"))
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

export const getAllStudentsController = async (req, res) => {
    try {
        const students = await getAllStudentsService();
        return res.status(StatusCodes.OK).json(successResponse(students, "All students fetched successfully"))
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