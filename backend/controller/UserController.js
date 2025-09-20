const UserModel = require('../model/UserModel')

const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken')

const ACCESS_SECRET = "access-secret-key"
const REFRESH_SECRET = "refresh-secret-key"

let refreshTokens = [];

const generateAccessToken = (user) =>{
    return jwt.sign({id:user._id ,username:user.username} , ACCESS_SECRET , {expiresIn:"15m"})
}

const generateRefreshToken = (user)=>{
    return jwt.sign({id:user._id , username:user.username} , REFRESH_SECRET , {expiresIn:'7d'})
}

exports.register = [async(req,res)=>{
    const { username, password } = req.body;
    const hashpassword = await bcrypt.hash(password , 10)
    const user = new UserModel({
        username,
        password:hashpassword
    })
     user.save().then((all)=>res.send(all)).catch((er)=>res.send(er.message))
}]


exports.login = [ async (req,res) =>{
    const {username , password} = req.body;
    
    const user = await UserModel.findOne({username})
    if(!user) return res.send("Invalid User")

    const isMatch = await bcrypt.compare(password , user.password)
    if(!isMatch) return res.send("Invalid Password")

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
    token = req.cookie.refreshToken
    refreshTokens = refreshTokens.filter(t => t !==token)
    res.clearCookie("refreshToken")
    res.json({ message: "Logged out successfully" });
}]

exports.protected=[(req,res)=>{
    res.json({ message: "Protected route access granted", user: req.user });
}]