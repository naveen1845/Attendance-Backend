import Faculty from "../models/faculty.js";
import crudRepository from "./crudRepository.js";

const facultyRepository = {
    ...crudRepository(Faculty)
}

export default facultyRepository;