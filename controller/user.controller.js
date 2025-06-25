import { log } from "console";
import User from "../model/User.model.js";
import crypto from "crypto";
import nodemailer from "nodemailer";

const registerUser = async (req, res) => {

  const { name, email, password } = req.body; //get data 

  // Validate input
  if (!name || !email || !password) {
    return res.status(400).json({ 
        message: "All fields are required" 
    });
  }

  try {
   const existinguser = await User.findOne({ email })
   if (existinguser) {
    return res.status(400).json({
        message: "User already exists"
    })
   }
   const user = await User.create({
    name,
    email,
    password
   }); // create new user
   console.log(user);
    // Check if user is created successfully
   if (!user) {
    return res.status(400).json({
        message: "User Not Registered"
    })
   }
    // Generate a verification token
   const token = crypto.randomBytes(32).toString("hex");
   console.log(token);
    user.verificationToken = token;
    await user.save();  //await kyuki database dusre continent mai hai . applies to all awaits .




    // Send verification email (this part is not implemented in this example)
  const transporter = nodemailer.createTransport({
    host: process.env.MAILTRAP_HOST,
    port: process.env.MAILTRAP_HOST,
    secure: false, // true for 465, false for other ports
    auth: {
    user: process.env.MAILTRAP_USERNAME,
    pass: process.env.MAILTRAP_PASSWORD,
  },
});
   
const mailOptions = ({ 
   from: process.env.MAILTRAP_SENDER_EMAIL,
    to: user.email, // list of receivers
    subject: "Verify your email", // Subject line
    text: `Please click on the following link: 
     ${process.env.BASE_URL}/api/v1/user/verify/${token}`,
   
  });

  await transporter.sendMail(mailOptions)
  res.status(201).json({
    message: "User Has been registered Successfully",
    success: true, 
  });



 } catch (error) {
   res.status(400).json({
    message: "User Not registered",
    error,
    success: false, 
  });

}
 
  
};

export { registerUser };