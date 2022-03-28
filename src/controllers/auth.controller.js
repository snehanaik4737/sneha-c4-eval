
const User = require("../models/user.model");

const jwt =require("jsonwebtoken");
require("dotenv").config();


const generateToken=(user)=>{
    return jwt.sign({user},process.env.SECRET_KEY)
}
const register =async(req,res)=>{
    try {

        let user =await user.findOne({email:req.body.email});

        if(user){
            return res.status(400).send({message:"email already exists"});

        }
        user =await User.create(req.body);
        const token = generateToken(user);
        return res.status(200).send({user,token})
        
    } catch (error) {
       return  res.status(400).send({message:error.message});
    }
}


const login = async(req,res)=>{
    try {
        let user =await user.findOne({email:req.body.email});
        if(!user){
            return res.status(400).send("wrong email or password");

        }
    const match =user.checkPassword(req.body.password);
    if(!match){
        return res.status(400).send({message:"wrong email or password"});
    }


    const token = generateToken(user);
    return res.status(200).send({user,token});
        
    } catch (error) {
     return  res.status(400).send({message:error.message});   
    }
}

module.exports={register,login}