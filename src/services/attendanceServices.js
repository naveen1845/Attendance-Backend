import attendanceRespository from "../repositories/attendanceRepository.js";

export const createAttendaceService = async (courseId, date, attendanceData) => {
    try {
        const attendance = await attendanceRespository.create({course: courseId, date, students: attendanceData });
        return attendance;
    } catch (error) {
        console.log(error);
        throw error;
    }
}