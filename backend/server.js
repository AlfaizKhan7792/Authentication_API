const express = require('express');
const connectDB = require('./config/db_config');
const MiddleWere = require('./middleWere/ErrorHandler');
require("dotenv").config()

const app = express()

// DB Connection
connectDB()

// Body Parser
app.use(express.json())
app.use(express.urlencoded({extended : true}))


// PORT
const PORT = process.env.PORT || 5005


// Single Root Route
app.get("/" , (req,res) =>{
    res.json({
        message : "Welcome To The Authentication API 1.0"
    })
})

// Auth Route
app.use("/api/user" , require("./routes/AuthRoutes"))


// Error Handler Middle Where
app.use(MiddleWere)

app.listen(PORT , () =>{
    console.log("Server is Running at :", PORT);
})