import mongoose from "mongoose";
import bcrypt from "bcryptjs";


const userSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
    },
    resetPasswordToken: {
      type: String,
    },
    resetPasswordExpires: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving to the database.
//pre hook to hash password before saving.
userSchema.pre("save", async function (next) {
if (this.isModified("password")) {
  this.password = await bcrypt.hash(this.password, 10);
}
  next();
})


const User = mongoose.model("User", userSchema);

export default User;
 