const MiddleWere = (err , req , res , next) =>{
    const ChechStatus = res.statusCode < 400 ? 500 : res.statusCode

    res.status(ChechStatus)

    res.json({
        message : err.message,
        stack : process.env.NODE_ENV === "production" ? null :  err.stack 
    })
}

module.exports = MiddleWere