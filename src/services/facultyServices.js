import facultyRepository from "../repositories/facultyRespository.js";

export const facultySignUpService = async (data) => {
    try {
        const newFaculty = await facultyRepository.create(data);
        return newFaculty;
    } catch (error) {
        console.log(error);
        throw error;
    }
}