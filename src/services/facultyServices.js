import facultyRepository from "../repositories/facultyRespository.js";
import ValidationError from "../utils/errors/ValidationError.js";

export const facultySignUpService = async (data) => {
    try {
        const newFaculty = await facultyRepository.create(data);
        return newFaculty;
    } catch (error) {
        if (error.name === 'ValidationError') {
            throw new ValidationError(
              {
                error: error.errors
              },
              error.message
            );
          }
          if (error.name === 'MongoServerError' && error.code === 11000) {
            throw new ValidationError(
              {
                error: ['Faculty with same email already exists']
              },
              'Faculty with same email already exists'
            );
        }
    }
}