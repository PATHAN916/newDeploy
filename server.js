const express=require("express");
const cors=require("cors");
const mongoose=require("mongoose");
const fs=require("fs");
const path=require("node:path");
const multer=require("multer");
const dotenv=require("dotenv");
dotenv.config();
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'upload')
    },
    filename: function (req, file, cb) {
      console.log(file)
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null,`${Date.now()}_ ${file.originalname}`)
    }
  })
  
  const upload = multer({ storage: storage })



let app=express();
app.use(cors());
app.use(express.json());
app.use('/upload', express.static('upload'));
app.use(express.static(path.join(__dirname,"./client/build")));



let connectToDB=async()=>{
    try{
    await mongoose.connect(process.env.dbPath);
    console.log("connected successfully");
       }catch(error){
        console.log("something went wrong");
       }
}

let UserSchema=new mongoose.Schema({
    firstName:String,
    lastName:String,
    email:String,
    password:String,
    profilePic:String,
})
let User=new mongoose.model("user",UserSchema)


app.post("/validateLogin",upload.none(),async(req,res)=>{
    console.log(req.data);
    
    let userDetails=await User.find().and({email:req.body.email})
    if(userDetails.length==0){
    res.json({status:"failure",msg:"user doesnot exit"});
    }else{
      if(userDetails[0].password==req.body.password){
        res.json({status:"success",msg:"valid credential",data:userDetails});
      }else{
        res.json({status:"failure",msg:"inncorrect password"});
      }
      }
    });
app.post("/signUp", upload.single("profilePic"),async(req,res)=>{
   
    console.log("we have received the request from client");
    console.log(req.file);
 console.log(req.body);

 let userDetails=await  User.find().and({email:req.body.email})
 if(userDetails.length > 0){
  res.json({status:"failure",msg:"user already exists"})
}else{
try{
  let newUser=new User({
    firstName:req.body.fn,
        lastName:req.body.ln,
        email:req.body.email,
        password:req.body.password,
        // profilePic:req.body.profilePic,
        profilePic:req.file.path,
  })
  User.insertMany([newUser])
  res.json({status:"success", msg:"userCreatedSuCCessFuLLy"});
}catch(err){
  res.json({status:"failure", msg:"userNotCreatedSuCCessFuLLy"});
}
  }})
app.listen(process.env.port,()=>{
    console.log("listenning port1234")
})
connectToDB();