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
    },
    getAttendaceDetails: async (attendanceId) => {
        const attendace = await Attendance.findById(attendanceId).populate('course', 'name').populate('students.studentId', 'name roll_no')
        console.log("attendance details: ", attendace);
        
        return attendace;
    },
    updateAttendance: async (attendanceId, studentsAttendance) => {
        const updatedAttendance = await Attendance.findByIdAndUpdate(attendanceId, {
            'students' : studentsAttendance
        }, {new: true})
        
        return updatedAttendance;

    }
}

export default attendanceRespository