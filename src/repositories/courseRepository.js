import Course from "../models/course.js";
import crudRepository from "./crudRepository.js";

const courseRepository = {
    ...crudRepository(Course)
}

export default courseRepository