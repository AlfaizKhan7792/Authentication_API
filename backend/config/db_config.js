const mongoose  = require("mongoose");

const connectDB = async () =>{
    try {
       const conn = await mongoose.connect(process.env.MONGO_URI)
       console.log("DB SERVER IS RUNNING AT :" , conn.connection.host); 
    } catch (error) {
        console.log("DB SERVER IS FAILD :" , error);
    }
}


module.exports = connectDB