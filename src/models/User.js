const mongoose = require('mongoose')

const schema = mongoose.Schema;

//usertype

const UserSchema = new schema({
    UserName: {type: String, required: true, unique: true},
    Password: {type: String, required: true},
    FirstName: {type: String, required: true},
    LastName: {type: String, required: true},
    Telephone: {type: String, required: true},
    DOB: {type: String, required: false},
    Email: {type: String, required: true},
},
    {collection: "Users"}
)
   const User = mongoose.model('User',UserSchema);

module.exports = User;