import Attendance from "../models/attendance.js";
import crudRepository from "./crudRepository.js";

const attendanceRespository = {
    ...crudRepository(Attendance),
    getCourseAttendanceRecords: async (courseId, startDate, endDate) => {
        try {
            const response = await Attendance.find({
                course: courseId,
                date: {
                    $gte: new Date(startDate),  // Greater than or equal to startDate
                    $lte: new Date(endDate)     // Less than or equal to endDate
                }
            }).sort({createdAt: -1}).populate('course', 'name').populate('students.studentId', 'name roll_no');
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