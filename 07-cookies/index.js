const express = require('express');
const app = express();
const cookieParser = require('cookie-parser')

app.use(cookieParser('this-is-my-secret')) //The secret should be in a env variable

app.get('/greet', (req, res) =>{
    const { name } = req.cookies
    res.send(`Hi ${name}`)
})

app.get('/setname', (req, res) =>{
    //send a cookie
    res.cookie('name', 'Rodrigo')
    res.send('OK, SENT YOU A COOKIE')
})

app. listen (3000, () => {
     console.log ("SERVING!")
})