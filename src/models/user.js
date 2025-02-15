import bcrypt from 'bcrypt'
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name of the user is required']
    },
    email: {
        type: String,
        unique: [true , 'Faculty with this email already exists'],
        sparse: true
    },
    password: { 
        type: String
    },
    role: {
        type: String,
        enum: ['faculty', 'student'],
        required : [true, 'Role is required']
    },
    roll_no: {
        type: String,
        unique: true,
        sparse: true
    },
    courses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course'
        }
    ]
}, {timestamps: true});

userSchema.pre("save", async function saveuser(next){
    const user = this;

    const salts = bcrypt.genSaltSync(9);

    const hashedPassword = bcrypt.hashSync(user.password, salts) ;

    user.password = hashedPassword;

    next();
})
const User = mongoose.model('User', userSchema);


export default User;