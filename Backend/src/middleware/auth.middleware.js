import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';


export const protectRoute = async(req,res,next)=>{
    try {

        const token = req.cookies.jwt; // get the token from the cookies

        if(!token){
            return res.status(401).json({message:"Unauthorized - No token"})
        }

        const decoded = jwt.verify(token,process.env.JWT_SECRET); // verify the token
        if(!decoded){
            return res.status(401).json({message:"Unauthorized - Invalid token"}) 
        }

        const user = await User.findById(decoded.userId).select('-password');// select all fields except password
        if(!user){
            return res.status(401).json({message:"Unauthorized - No user found"})
        }

        req.user = user; // attach the user to the request object4
        next();
    } catch (error) {
        console.log("Error in protectRoute middleware", error.message);
        res.status(500).json({message:"Internal server error"})
    }
}