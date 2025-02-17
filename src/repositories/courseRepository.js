import Course from "../models/course.js";
import crudRepository from "./crudRepository.js";

const courseRepository = {
    ...crudRepository(Course),

    findByIdAndUpdate: async (courseId, studentIds) => {
        const updatedCourse = await Course.findByIdAndUpdate(courseId, { 
            $addToSet: { students: { $each: studentIds } }
        })
        return updatedCourse;
    }
}

export default courseRepository;