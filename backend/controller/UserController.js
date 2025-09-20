const UserModel = require('../model/UserModel')

const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken')

const nodemailer = require('nodemailer')

const ACCESS_SECRET = "access-secret-key"
const REFRESH_SECRET = "refresh-secret-key"
const RESET_SECRET = "reset-secret-key"

let refreshTokens = [];

const generateAccessToken = (user) =>{
    return jwt.sign({id:user._id ,username:user.username} , ACCESS_SECRET , {expiresIn:"15m"})
}

const generateRefreshToken = (user)=>{
    return jwt.sign({id:user._id , username:user.username} , REFRESH_SECRET , {expiresIn:'7d'})
}

const generateResetSecret = (user)=>{
    return jwt.sign({id:user._id } , RESET_SECRET , {expiresIn:'15m'})
}

exports.register = [async(req,res)=>{
    const { username, password ,email } = req.body;
    const hashpassword = await bcrypt.hash(password , 10)
    const user = new UserModel({
        email,
        username,
        password:hashpassword
    })
     user.save().then((all)=>res.send(all)).catch((er)=>res.send(er.message))
}]


exports.login = [ async (req,res) =>{
    const {username , password  } = req.body;
    
    const user = await UserModel.findOne({username})
    if(!user) return res.json({message:"User not found"})

    const isMatch = await bcrypt.compare(password , user.password)
    if(!isMatch) return res.json({message:"Invalid credentials"})

    const accessToken = generateAccessToken(user)
    const refreshToken = generateRefreshToken(user)

    refreshTokens.push(refreshToken)

    res.cookie("refreshToken" , refreshToken,{
        httpOnly:true,
        secure:false,
        sameSite:"lax",
        path:'/'
    })

    res.json({accessToken})

}]

exports.refresh = [(req,res)=>{
    const token = req.cookie.refreshToken;
    if(!token) return res.json({message:"Refresh token required"});
    if(!refreshTokens.includes(token))return res.json({message: "Invalid refresh token"});
    
    jwt.verify(token ,REFRESH_SECRET ,(err , user)=>{
        if (err) return res.json({ message: "Token expired/invalid" });
    const newAccessToken = generateAccessToken(user)
    res.json({accessToken:newAccessToken})
    })
}]

exports.logout = [(req,res)=>{
    token = req.cookies.refreshToken
    refreshTokens = refreshTokens.filter(t => t !==token)
    res.clearCookie("refreshToken")
    res.json({ message: "Logged out successfully" });
}]

exports.normal=[(req,res)=>{
    res.json({ message: "This is normal public data (no token required)"});
}]

exports.protected=[(req,res)=>{
    res.json({ message: `Protected route access granted successfully for user :  ${req.user.username}` });
}]




exports.forgotPassword = [async(req,res)=>{
    const { email } = req.body;
    if(!email) return res.json({message:"Email is required"});

    const user = await UserModel.findOne({email});

    if(!user) return res.json({message:"Email not registered"});

    const resetToken = generateResetSecret(user)

    const transporter = nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:"samuelreegan372@gmail.com",
            pass:"nbuj gdwc buon gceb"
        }
    })

    const mailOptions = {
        form:"samuelreegan372@gmail.com",
        to:email,
        subject:"Password Reset",
        html: `<p>Click the link to reset your password:</p>
               <a href="http://localhost:3000/reset-password/${resetToken}">Reset Password</a>`
    }

    transporter.sendMail(mailOptions , (err ,info)=>{
        if(err) return res.json({message:"Error sending email", error:err.message});
        res.json({message:"Reset link sent to your email"});
    })
}]

exports.resetPassword = [async(req,res)=>{
    const { token } = req.params;
    const { newPassword } = req.body;

    if(!newPassword) return res.json({message:"New password is required"});

    try{
        const decoded = jwt.verify(token, RESET_SECRET);
        const user = await UserModel.findById(decoded.id);
        if(!user) return res.json({message:"User not found"});

        const hashed = await bcrypt.hash(newPassword, 10);
        user.password = hashed;
        await user.save();

        res.json({message:"Password reset successful. You can login now."});
    }catch(err){
        res.json({message:"Invalid or expired token"});
    }
}]


exports.updatePassword = [async (req, res) =>{
    const { oldPassword, newPassword, confirmPassword } = req.body;
    try {

        const user = await UserModel.findById(req.user.id);
        if (!user) return res.json({ message: "User not found" });

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) return res.json({ message: "Old password is incorrect" });

        if (newPassword !== confirmPassword) {
        return res.json({ message: "New password and confirm password do not match" });
        }

        const hashed = await bcrypt.hash(newPassword, 10);
        user.password = hashed;
        await user.save();

        res.json({ message: "Password updated successfully" });
    } catch (err) {
        res.json({ message: "Something went wrong", error: err.message });
    }
}]