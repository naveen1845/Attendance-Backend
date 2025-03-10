import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    students: [
        {
            studentId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            isPresent: {
                type: Boolean,
                required: true
            }
        }
    ]
}, {timestamps: true})

const Attendance = mongoose.model('Attendance', attendanceSchema);

export default Attendance;