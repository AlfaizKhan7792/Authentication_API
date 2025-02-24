const jwt = require("jsonwebtoken")
const Auth = require("../models/AuthSchema")
const expressAsyncHandler = require("express-async-handler")

const Protect = expressAsyncHandler( async (req , res , next) =>{
    let token;
    try {
        if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
            token = req.headers.authorization.split(" ")[1]
            const decoded = jwt.verify(token , process.env.JWT_SECRET)
            req.user = await Auth.findById(decoded._id).select("-password")
            next()
        }else{
            res.status(401)
            throw new Error("User Not Authorized!!");            
        }
    } catch (error) {
        res.status(401)
            throw new Error("User Not Authorized!!", error);            
    }
})

module.exports = Protect