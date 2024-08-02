const MONGO_URI='mongodb+srv://sonal_dsouza:sonal123@cluster0.ywz32xb.mongodb.net/'

const mongoose = require('mongoose')

const connectDB = async()=>{
    try{
        const conn = await mongoose.connect(MONGO_URI)
        console.log('-:DataBase Connection Successfull:-');
    }
    catch(error){
        console.log(error);
    }
}
module.exports = connectDB