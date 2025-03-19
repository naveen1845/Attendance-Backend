import attendanceRespository from "../repositories/attendanceRepository.js";
import ClientError from "../utils/errors/ClientError.js";
import { getCourseWithStudentsDetailsService } from "./courseServices.js";

export const createAttendaceService = async (courseId) => {
    try {

        const course = await getCourseWithStudentsDetailsService(courseId);
        if(!course){
            throw new ClientError({
                message: 'This Course doesnt exist',
                explanation: 'This Course doesnt exist'
            })
        }

        if(course.students.length == 0 ){
            throw new ClientError({
                message: 'No Students in the course',
                explanation: 'This Course doesnt exist'
            })
        }

        const attendanceData = course.students.map((student) => ({'studentId' : student._id, isPresent: false}))

        console.log("attendance Data", attendanceData);
        

        const date = new Date();
        
        const attendance = await attendanceRespository.create({course: courseId, date: date, students: attendanceData});
        return attendance;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const getCourseAttendanceRecordsService = async (courseId, startDate, endDate) => {
    try {
        const attendances = await attendanceRespository.getCourseAttendanceRecords(courseId, startDate, endDate);
        return attendances;
    } catch (error) {
        console.log(error);
        throw error
    }
}

export const getAttendaceDetailsService = async (attendaceId) => {
    try {
        const attendance = await attendanceRespository.getAttendaceDetails(attendaceId)
        return attendance;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const updateAttendanceService = async (attendaceId, studentsAttendance) => {
    try {
        const updatedAttendace = await attendanceRespository.updateAttendance(attendaceId, studentsAttendance)
        return updatedAttendace;
    } catch (error) {
        console.log(error);
        throw error;
        
    }
}