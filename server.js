const express = require('express')
const app = express()
const cors = require('cors')

//importing the .env file
require('dotenv').config()

app.get('/',(req,res) => {
    res.json({message : 'The server is running !'})
})

app.listen(process.env.PORT,() => {
    console.log('The server is running at http://localhost:',process.env.PORT)
})