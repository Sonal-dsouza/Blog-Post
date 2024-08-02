const mongoose=require('mongoose');

const newSchema = mongoose.Schema({
    uname:
    {
        type:String,
        required: true,
    },
    email:
    {
        type:String,
        required: true,
        unique: true
    },
    password:
    {
        type:String,
        required: true,
    },
})
const UserSchema = mongoose.model("user_details  ",newSchema);

module.exports=UserSchema