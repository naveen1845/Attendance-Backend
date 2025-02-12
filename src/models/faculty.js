import bcrypt from 'bcrypt'
import mongoose from "mongoose";

const facultySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true , 'Faculty name is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: [true , 'Faculty with this email already exists']
    },
    password: { 
        type: String,           // hashede password here
        required: [true, 'Password is required']
    },
    courses:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }]
}, {timestamps: true})

facultySchema.pre("save", async function saveFaculty(next){
    const faculty = this;

    const salts = bcrypt.genSaltSync(9);

    const hashedPassword = bcrypt.hashSync(faculty.password, salts) ;

    faculty.password = hashedPassword;

    next();
})

const Faculty = mongoose.model('Faculty', facultySchema);

export default Faculty;