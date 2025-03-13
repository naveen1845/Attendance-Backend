import Course from "../models/course.js";
import crudRepository from "./crudRepository.js";

const courseRepository = {
    ...crudRepository(Course),

    // findByIdAndUpdate: async (courseId, studentIds) => {
    //     const updatedCourse = await Course.findByIdAndUpdate(courseId, { 
    //         $addToSet: { students: { $each: studentIds } }   // this line is to add students without creating duplicates. But i also wanted to remove students if required...so rewrote the function below
    //     })
    //     return updatedCourse;
    // },

    findByIdAndUpdate: async (courseId, studentIds) => {
        const updatedCourse = await Course.findByIdAndUpdate(courseId, { 
            'students': studentIds   //directly replaces the existing array with new array of ids
        }, {new: true})
        return updatedCourse;
    },
    getAllFacultyCourses: async (facultyId) => {
        const courses = await Course.find({
            "faculty": facultyId
        })
        return courses;
    },
    findByIdWithStudentDetails: async (courseId) => {
        const course = await Course.findById(courseId).populate('students', 'name email roll_no');
        return course;
    }
}

export default courseRepository;