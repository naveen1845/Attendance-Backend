import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    code: {
        type: String,
        required : [true, 'Course Code is required'],
        unique: [true, 'Course with this code already exists']
    },
    name: {
        type: String,
        required: [true, 'Course Name is required']
    },
    faculty: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Faculty',
        required: [true, 'faculty for this course is required']
    },
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    }]
}, {timestamps: true})

const Course = mongoose.model('Course', courseSchema);

export default Course;