import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";

import { JWT_SECRET_KEY } from "../config/serverConfig.js";
import { CustomErrorResponse, internalErrorResponse } from "../utils/common/responseObjects.js";

export const isAuth = async (req, res, next) => {
    try {
        const token = req.headers['x-access-token']

        if (!token) {
            return res.send(StatusCodes.FORBIDDEN).json(CustomErrorResponse({
                message: 'No token Provided',
                explanation: 'Please Provide x-access-token to continue'
            }))
        }

        const response = jwt.verify(token, JWT_SECRET_KEY);

        if (!response) {
            return res.send(StatusCodes.FORBIDDEN).json(CustomErrorResponse({
                message: 'Invalid token Provided',
                explanation: 'Provide a valid token to continue'
            }))
        }

        req.user = {
            _id : response._id,
            email: response.email,
            role: response.role
        };

        next();
    } catch (error) {
        if (error.name == 'JsonWebTokenError' || error.name == 'TokenExpiredError') {
            return res.send(StatusCodes.FORBIDDEN).json(CustomErrorResponse({
                message: 'Token is expired',
                explanation: 'Token expired. Please log in again to get a fresh token'
            }))
        }

        return res.send(StatusCodes.INTERNAL_SERVER_ERROR).json(internalErrorResponse(error))
    }
}