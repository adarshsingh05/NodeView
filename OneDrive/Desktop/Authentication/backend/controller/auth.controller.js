import {User} from '../models/user.model.js'
import bcryptjs from 'bcryptjs'
import { generateTokenAndSetCookie } from '../utils/generateTokenAndSetCookie.js';
import { generateVerificationCode } from '../utils/generateVerificationCode.js';
export const  signup = async(req,res)=>{
    // getting user data from body
    const {email, password, name} = req.body;
try {
    if(!email || !name || !password){
        throw new Error("All fields required");

    }
    const userALreadyExist = await User.findOne({email});
    console.log("already exixst" , userALreadyExist)
    if(userALreadyExist){
       return  res.status(400).json({success:false, message: "user already exist"})
    }
    const hashedPassword = await bcryptjs.hash(password,10 );
    const verificationToken = generateVerificationCode();
    const user = new User({
        email,
        password: hashedPassword,
        name,
        verificationToken: verificationToken,
        verificationTokenExpiresAt: Date.now() +24 *60*60*1000
    })
    await user.save();

    // token to verify on email - this is a function below in utils
    generateTokenAndSetCookie(res, user._id);
    // sending a response to verify the sigup
    res.status(201).json({
        success:true,
        message: "created",
        user:{
            ...user._doc,
            password:undefined

        }
    })
} catch (error) {
    console.log("error getting the value", error)
} 
}
export const login = async(req,res)=>{
    res.send("signup route")
}
export const logout = async(req,res)=>{
    res.send("Logout route")
}