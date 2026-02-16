import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async(req,res)=>{
  const {name,email,password}=req.body;

  if(!name || !email || !password){
    return res.status(400).json({message:"All fields required"});
  }

  if(password.length<6){
    return res.status(400).json({message:"Password min 6 chars"});
  }

  const exists = await User.findOne({email});
  if(exists) return res.status(400).json({message:"User exists"});

  const hashed = await bcrypt.hash(password,10);

  await User.create({name,email,password:hashed});

  res.json({message:"Registered"});
};

export const login = async(req,res)=>{
  const {email,password}=req.body;

  const user = await User.findOne({email});
  if(!user) return res.status(400).json({message:"Invalid credentials"});

  const match = await bcrypt.compare(password,user.password);
  if(!match) return res.status(400).json({message:"Invalid credentials"});

  const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"1d"});

  res.json({
    token,
    user:{name:user.name,email:user.email}
  });
};
