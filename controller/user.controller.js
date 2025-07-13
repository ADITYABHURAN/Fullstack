import { log } from "console";
import User from "../model/User.model.js";
import crypto from "crypto";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


const registerUser = async (req, res) => {
//get data
//validate
//check if user already exists
//create user
//generate verification token
//save token in database
//send token as email to user
//send success status to user 

  const { name, email, password } = req.body; //get data 

  // Validate input
  if (!name || !email || !password) {
    return res.status(400).json({ 
        message: "All fields are required" 
    });
  }
// Check if user already exists we use try-catch
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
    port: process.env.MAILTRAP_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
    user: process.env.MAILTRAP_USERNAME,
    pass: process.env.MAILTRAP_PASSWORD,
  },
});
   
const mailOptions = ({ 
    from: process.env.MAILTRAP_SENDEREMAIL,
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


const verifyUser = async (req, res) => {
 const { token } = req.params; //get token from params/url
 console.log(token); //vaildate token
 if (!token) {       //vaildate token
  return res.status(400).json({   //vaildate token
    message: "Invalid token", //vaildate token
  });
 }
  const user = await User.findOne({ verificationToken: token }); //find user with token

   if (!user) {       //vaildate token
  return res.status(400).json({   //vaildate token
    message: "Invalid token", //vaildate token
  });
 }
  user.isVerified = true; //set user as verified
  user.verificationToken = undefined; //remove token
  await user.save(); //save user

}
//common boler plate for login function
const login = async (req, res) => {  
  const { email, password } = req.body; //get data
  if (!email || !password) { //validate input
    return res.status(400).json({
        message: "All fields are required"  
    });
  }

  try {
    const user = await User.findOne({ email }); //find user with email
    if (!user) { //if user not found
      return res.status(400).json({
        message: "invalid email or password"
      });
    }
  
    //now to check password we will use bcrypt
    const isMatch = await bcrypt.compare(password, user.password)

    console.log(isMatch);

    if (!isMatch) { //if password not match
      return res.status(400).json({
        message: "invalid email or password",
      });
    }

    const token = jwt.sign({id: user._id, role: user.role},

      "shhhh", {
        expiresIn: "1d" //token will expire in 1 day
      }
    );
    const cookieOptions = {
      httpOnly: true, //cookie will not be accessible from client side
      secure: true,
      maxAge: 24 * 60 * 60 * 1000, //cookie will expire in 1 day
    };
    
    res.cookie("token", token,  cookieOptions); //set cookie with token


    res.status(200).json({
      message: "User logged in successfully",
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      }
    });


  } catch (error) {
    
  }
}


export { registerUser, verifyUser, login }; //export functions