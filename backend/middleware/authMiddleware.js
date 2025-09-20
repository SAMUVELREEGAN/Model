const jwt = require('jsonwebtoken')

const ACCESS_SECRET = 'access-secret-key'

exports.authenticateToken = [(req,res,next)=>{
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) return res.json({ message: "Access token required" });

    jwt.verify(token , ACCESS_SECRET , (err , user)=>{
        if (err) return res.json({ message: "Invalid/Expired access token" });
        req.user = user
        next();
    })
}]
