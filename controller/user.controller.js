import { User } from "../models/user.model.js";

const registerUser = async (req, res) => {

  const { name, email, password } = req.body; //get data 

  // Validate input
  if (!name || !email || !password) {
    return res.status(400).json({ 
        message: "All fields are required" 
    });
  }


  try {
   const existinguser = await User.FindOne({ email})
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
    
   if (!user) {
    return res.status(400).json({
        message: "User Not Registered"
    })
   }


  } catch (error) {
    
  }
 
  
};

export { registerUser };