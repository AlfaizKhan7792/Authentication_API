const express = require('express');
const connectDB = require('./config/db_config');
const MiddleWere = require('./middleWere/ErrorHandler');
const cors = require("cors")
require("dotenv").config()

const app = express()

// DB Connection
connectDB()


// Enable Public CORS
app.use(cors({
    origin: "*",
    methods: "GET, POST, PUT, DELETE, OPTIONS",
    allowedHeaders: "Content-Type, Authorization"
}));



// Handle Preflight Requests
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    
    if (req.method === "OPTIONS") {
        return res.sendStatus(200);
    }
    
    next();
});


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