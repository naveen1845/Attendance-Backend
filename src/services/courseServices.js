
import { v4 as uuidv4} from "uuid";

import User from "../models/user.js";
import courseRepository from "../repositories/courseRepository.js";
import ClientError from "../utils/errors/ClientError.js";
import ValidationError from "../utils/errors/ValidationError.js";

export const createCourseService = async (data, user) => {
    try {
        if(user.role !== 'faculty'){
          throw new ClientError({
            explanation: 'Only faculty can create a course',
            message: 'User is not a Faculty'
          })
        }

        const code = uuidv4().substring(0, 6).toUpperCase();

        const newCourse = await courseRepository.create({...data, code: code, faculty: user._id})
        return newCourse
    } catch (error) {
        console.log(error);
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
                error: ['user with same email already exists']
              },
              'user with same email already exists'
            );
        }
        throw error;
    }
}


export const addStudentsToCourseSerivice = async (courseId, studentIds, user) => {
  try {
    
    if(user.role !== 'faculty'){
      throw new ClientError({
        explanation: 'Only faculty can create a course',
        message: 'User is not a Faculty'
      })
    }

    const course = await courseRepository.getById(courseId);

    if(!course){
      throw new ClientError({
        message: 'This course does not exists',
        explanation: 'This course does not exists'
      })
    }

    const updatedCourse = await courseRepository.findByIdAndUpdate(courseId, studentIds);

    await User.updateMany(
      { _id: { $in: studentIds }, role: "student" },
      { $addToSet: { courses: courseId } }
    );

    return updatedCourse;

  } catch (error) {
    console.log(error);
    throw error;
  }
}


export const getAllFacultyCoursesService = async (facultyId) => {
  try {
    const courses = await courseRepository.getAllFacultyCourses(facultyId);
    if(!courses){
      throw new ClientError({
        message: 'This faculty does not have any courses',
        explanation: 'This faculty does not have any courses'
      })
    }

    return courses;

  } catch (error) {
    console.log(error);
    throw error;
  }
}

export const getCourseWithStudentsDetailsService = async (courseId) => {
  try {
    const courses = await courseRepository.findByIdWithStudentDetails(courseId);
    if(!courses){
      throw new ClientError({
        message: 'This Course does not exist',
        explanation: 'This course does not exist'
      })
    }

    return courses;
  } catch (error) {
    console.log(error);
    throw error;
  }
}