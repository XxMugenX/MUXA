const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const path = require('path');
const User = require('./src/models/User')
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken')

//helper variables
const app = express();
const PORT = process.env.PORT;
const URI = process.env.ATLAS_URI;
const connection = mongoose.connection;
//end

const JWT_SECRET = 'Fib1q3w2e1r3t4y5u5i8o9p1a4s4d0f7g0h1j9k4l7z5x3c2v7B'

//middleware
/*app.use('/',express.static(path.join(__dirname, '/public/img')))*/
app.use('/',express.static(path.join(__dirname, '/public')))
app.use('/',express.static(path.join(__dirname, '/public/static')))
app.use(express.json())
//end

//endpoints
app.post('/api/Signup',async  (req,res) => {
    //get and store values from body of signup page
    const{
        UserName, password:plainTextPassword,
        DOB, email,
        telephone, F_name,
        L_name
    } = req.body;

    if(typeof plainTextPassword !== 'string') {
        return res.json({
            status: 'error',
            error: ' invalid password',
            errortype: 'password'
        })

    }
    if(plainTextPassword.length < 6 || plainTextPassword.length === null ) {
        return res.json({
            status: 'error',
            error: ' length must be 6 or more',
            errortype: 'password'
        })
    }
    //handle username inputted as whitespaces
    if(!UserName || typeof UserName !== 'string' || UserName === null) {
        return res.json({
            status: 'error',
            error: ' invalid Username',
            errortype: 'username'
        })
    }

    //password hashing and security
    const password = await bcrypt.hash(plainTextPassword,10);
    //end

    try{
    const NewUser = await User.create({
        UserName: UserName,
        Password: password,
        FirstName: F_name,
        LastName: L_name,
        Telephone: telephone,
        DOB: DOB,
        Email: email,
})
console.log('Signup successful: ', NewUser)
}catch (error) {
    if (error.code === 11000){
        return res.json({error:'Username is already in use'});
    }
    throw error;
}
    res.json({status:'ok'})
})

//login endpoint
app.post('/api/Login', async (req,res) => {
    const{UserName, password} = req.body;

    //finds user and verifies
    const user = await User.findOne({UserName}).lean();
    
    if(!user) {
        return res.json({
            status: 'error',
            error: 'Incorrect Username/Password'
        })
    }
    if(await bcrypt.compare(password, user.Password)) {
       const token = JWT.sign({
            id: user._id,
            Username: user.UserName
        }, JWT_SECRET)

        return res.json({status: 'ok', token: token})
    }
    else {
        return res.json({
        status: 'error',
        error: 'Incorrect Username/Password'
    })}
    //end
})

//profile endpoint
app.post('/api/Profile', async(req,res)=>{
    const {Token, About} = req.body
    try {
        const person = JWT.verify(Token, JWT_SECRET)
        const _id = person.id;
        const user = await User.findById(_id)
        return res.json({
            status: 'ok',
            Username : user.UserName,
            FirstName : user.FirstName,
            LastName : user.LastName,
            Telephone : user.Telephone,
            Email : user.Email,
        })
    }catch(err){
        console.log(err.code)
        return res.json({error: err})
    
}
})

//profile update endpoint
app.post('/api/Editprofile', async(req,res)=> {
    const{Token, FirstName, LastName, Email, Telephone, About } = req.body
    
    try {
        const person = JWT.verify(Token, JWT_SECRET)
        const _id = person.id;
        //handle empty textbox, if empty, use previous value, else update
        const user = await User.findByIdAndUpdate(_id,{
           FirstName : FirstName,
           LastName : LastName,
           Email : Email,
           Telephone : Telephone,
           About : About
        }, {
            upsert:true
        })
        return res.json({
            status : 'ok',
            UpdateMessage : 'user details updated succedfully'
            }
        )
    }catch(err){
        console.log(err)
    }
})
//end

//search endpoint start
app.post('/api/homepage/searcheditem',async(req,res)=>{
    const{Searched} = req.body

    const results =await Item.find(Searched)
    return res.json({
        result:results
    })
})

app.post('api/Profile/Changepassword', async(req,res)=>{
    const{newPassword:plainTextPassword, Token} = req.body

    if(typeof plainTextPassword !== 'string') {
        return res.json({
            status: 'error',
            error: ' invalid password',
            errortype: 'password'
        })

    }
    if(plainTextPassword.length < 6 || plainTextPassword.length === null ) {
        return res.json({
            status: 'error',
            error: ' length must be 6 or more',
            errortype: 'password'
        })
    }

    //password hashing and security
    const password = await bcrypt.hash(plainTextPassword,10);
    //end

    try{
        const person = JWT.verify(Token,JWT_SECRET)
        const _id = person.id
        //complete later...i need to get user former password annd update with the new one
        const user = await User.findByIdAndUpdate(_id, )
    }

})


//starts connection
mongoose.connect(URI);
//end

//start listening for when  the connection is open
connection.once('open', () => {
    console.log('database is up')
})
//end


app.listen(PORT, () => {
    console.log(`server is live at port ${PORT}`)
})