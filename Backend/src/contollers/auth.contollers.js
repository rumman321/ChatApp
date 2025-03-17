
import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
export const signup = async(req,res)=>{
    const {email,fullName,password} = req.body;
    try {
        //hash password
        if(password.length<6){
            return res.status(400).json({message: "Password must be least 6 characters"})
        }
        const user = await User.findOne({email})
        if(user) return res.status(400).json({message:"User already exists"})
        const salt = await bcrypt.getSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)
    } catch (error) {
        
    }
}

export const login = (req,res)=>{
    res.send('login route')
}

export const logout = (req,res)=>{
    res.send('logout route')
}