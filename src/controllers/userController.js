const userModel=require("../models/user");
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const SECRET_KEY=process.env.SECRET_KEY;
const signup= async(req,res) => { //register

     //Check For user if aleardy registered
     //Encypt password
     //User Create
     //Token Generate
     const{username,email,password}=req.body
     try {
         const existingUser= await userModel.findOne({email: email})
         if(existingUser){
             return res.status(400).json({message:"User aleardy exists"});
         }
         const hashPassword=await bcrypt.hash(password,10);
         const result= await userModel.create({
             email: email,
             password: hashPassword,
             username:username
         });

         const token = jwt.sign({email: result.email, id:result._id},SECRET_KEY)
         res.status(201).json({user:result,token:token});
     } catch (error) {
        console.log(error)
        res.status(500).json({message:"Something went wrong"})
     }
}
const signin=async (req,res) => {
     const{email,password}=req.body
     try {
         const existingUser= await userModel.findOne({email:email})
         if(!existingUser){
             return res.status(404).json({message:"User Not Found"});
         }
        const matchPassword= await bcrypt.compare(password,existingUser.password); 
        if(!matchPassword){
            return res.status(400).json({message:"Invalid Credentials"})
        }
        const token = jwt.sign({email: existingUser.email, id:existingUser._id},SECRET_KEY)
         res.status(200).json({user:existingUser,token:token});
         
     } catch (error) {
         console.error(error);
         res.status(500).json({message:"Something went wrong"});
     }   
}

module.exports ={signup, signin};