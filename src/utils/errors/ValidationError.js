import { StatusCodes } from "http-status-codes";

class ValidationError extends Error {
    constructor(errorDetails, message){
        super(message);
        let explanation = [];
        Object.keys(errorDetails.error).forEach((key) => {
            explanation.push(errorDetails.error[key]);
        });
        this.explanation = explanation;
        this.name = 'ValidationError',
        this.message = message,
        this.statusCode = StatusCodes.BAD_REQUEST
    }
}

export default ValidationError;