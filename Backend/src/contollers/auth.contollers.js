
import { generateToken } from '../lib/utils.js';
import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'

export const signup = async(req,res)=>{
    const {email,fullName,password} = req.body;
    try {
    if(!email || !fullName || !password){
        return res.status(400).json({message:"please fill all fields"})
    }
        //hash password
        if(password.length<6){
            return res.status(400).json({message: "Password must be least 6 characters"})
        }
        const user = await User.findOne({email})
        if(user) return res.status(400).json({message:"User already exists"})
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)
        
        const newUser= new User({
            fullName,
            email,
            password: hashedPassword,
        })
        if(newUser){
            generateToken(newUser._id,res)
            await newUser.save()

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic

            })
        }else{
            res.status(400).json({message:"Invalid user data"})
        }
    } catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({message:"Internal server error"})
    }
}

export const login = async(req,res)=>{
    const {email,password} = req.body
    try {
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({message:"Invalid credentials"})
        }
        //password is from the request body and user.password is the hashed password from the database
        const isPasswordCorrect = await bcrypt.compare(password,user.password)//compare the password with the hashed password
        if(!isPasswordCorrect){
            return res.status(400).json({message: "Invalid Credential"})
        }
        generateToken(user._id,res)
        res.status(200).json({
            _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic
        })
    } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({message: "Invalid credentials"})
    }
}

export const logout = (req,res)=>{
    res.send('logout route')
}