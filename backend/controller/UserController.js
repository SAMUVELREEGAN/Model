const UserModel = require('../model/UserModel')

const bcrypt = require('bcrypt')

const ACCESS_SECRET = "access-secret-key"
const REFRESH_SECRET = "refresh-secret-key"

let refreshTokens = [];

exports.register = [async(req,res)=>{
    const hashpassword = await bcrypt.hash(req.body.password , 10)
    const user = new UserModel({
        username:req.body.username,
        password:hashpassword
    })
     user.save().then((all)=>res.send(all)).catch((er)=>res.send(er.message))
}]