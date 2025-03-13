import Course from "../models/course.js";
import crudRepository from "./crudRepository.js";

const courseRepository = {
    ...crudRepository(Course),

    findByIdAndUpdate: async (courseId, studentIds) => {
        const updatedCourse = await Course.findByIdAndUpdate(courseId, { 
            $addToSet: { students: { $each: studentIds } }
        })
        return updatedCourse;
    },
    getAllFacultyCourses: async (facultyId) => {
        const courses = await Course.find({
            "faculty": facultyId
        })
        return courses;
    },
    findByIdWithStudentDetails: async (courseId) => {
        const course = await Course.findById(courseId).populate('students', 'name email');
        return course;
    }
}

export default courseRepository;