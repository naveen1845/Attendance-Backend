
import mongoose from "mongoose";

const studentModel = new mongoose.Schema({
    roll_no : {
        type: String,
        unique: [true, 'Student with this roll number already exists'],
        required: [true, 'roll no is required']
    },
    name: {
        type: String,
        required: [true, 'Student name is required'],
    },
    courses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course'
        }
    ]
}, {timestamps: true})

const Student = mongoose.model("Student", studentModel);

export default Student;