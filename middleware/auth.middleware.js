//when the user trys to contact with the server, this middleware will check if the user is logged in or not, as the name states middleware works as a middle man 
import JWt from "jsonwebtoken";

export const isLoggedIn = async (req, res, next) => { 
 //try catch block to handle errors
 try {
    console.log(req.cookies);
    let token = req.cookies?.token //get the token from cookies

    console.log('Token Found: ', token ? "Yes" : "No");

    if(!token) {
        console.log("NO token");
        return res.status(401).json({ 
            success: false,
            message: "You are not logged in, please login to continue"  
        });
        

    }

    //token me se data nikalne ke liye JWT lagega toh pehle JWT import karna padega
    JWt.verify(token, process.env.JWT_SECRET)
    
    
    
 } catch (error) {
    
 }
    //if this doesnt workout or is not applicable use Next() to go to the next middleware
    next();
}