const mongoose = require('mongoose');
const UserSchema  = new mongoose.Schema({
    user_name :{
        type  : String,
        required : true,
        unique: true
    } ,
    email :{
        type  : String,
        required : true,
        unique : true,
    } ,
    password :{
        type  : String,
        required : true
    } ,
    
},{collection : 'Users'});
const User = mongoose.model('User',UserSchema);

module.exports = User;
