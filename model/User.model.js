import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String, // You can add more fields as per your requirements
    role: {
        type: String,
        enum: ['admin', 'user'], // Define roles as per your requirements
        default: 'user' // Default role is user
    },
    isVerified: {
        type: Boolean,
        default: false // Default is not verified
    },
    VerificationToken: {
        type: String,
    },
    resetPasswordToken: {
        type: String,
    },
    resetPasswordExpires: {
        type: Date,
    }
}, {
    timestamps: true // Automatically manage createdAt and updatedAt fields 
}) 

const User = mongoose.model("User", userSchema);

export default User;