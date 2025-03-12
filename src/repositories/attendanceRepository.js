import Attendance from "../models/attendance.js";
import crudRepository from "./crudRepository.js";

const attendanceRespository = {
    ...crudRepository(Attendance),
    getCourseAttendanceRecords: async (courseId) => {
        try {
            const response = await Attendance.find({
                "course" : courseId
            })
            return response;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

export default attendanceRespository