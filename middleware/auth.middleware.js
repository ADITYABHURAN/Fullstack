//when the user trys to contact with the server, this middleware will check if the user is logged in or not, as the name states middleware works as a middle man 


export const isLoggedIn = async (req, res, next) => { 





    
    //if this doesnt workout or is not applicable use Next() to go to the next middleware
    next();
}