import Attendance from "../models/attendance.js";
import crudRepository from "./crudRepository.js";

const attendanceRespository = {
    ...crudRepository(Attendance)
}

export default attendanceRespository