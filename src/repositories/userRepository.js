
import User from "../models/user.js";
import crudRepository from "./crudRepository.js";

const userRepository = {
    ...crudRepository(User),
    
    findByEmail: async ( email ) => {
        const user = await User.findOne({ email });
        return user
    }, 
    getAllStudents: async () => {
        const students = await User.find({
            'role' : 'student'
        });
        return students;
    }
}

export default userRepository;