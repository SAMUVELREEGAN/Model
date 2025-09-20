const validator = require("validator");


exports.validateRegister = [(req, res, next) =>{
    const { email, username, password } = req.body;

    if (!email || !validator.isEmail(email)) {
    return res.json({ message: "Valid email is required" });
    }

    if (!username || username.length <= 3) {
    return res.json({ message: "Username must be at least 3 characters long" });
    }

    if (!password || password.length <= 3) {
    return res.json({ message: "Password must be at least 3 characters long" });
  }
  next();
}]