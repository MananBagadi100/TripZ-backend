const express = require('express')
const app = express()
const cors = require('cors')
const cookieParser = require('cookie-parser')


//importing the .env file
require('dotenv').config()

//for handling cors
app.use (cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}))
console.log('The port of frontend is ',process.env.FRONTEND_URL)

// const allowedOrigins = [
//   "http://localhost:5173",
//   "https://ecommerce-frontend-six-ruby.vercel.app",
//   "http://localhost:4173"
// ];

// const corsOptions = {
//   origin: function (origin, callback) {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       console.log("❌ Blocked by CORS:", origin);
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   credentials: true,
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//   allowedHeaders: ["Content-Type", "Authorization"],
// };

// app.use(cors(corsOptions));


//for parsing any cookie data
app.use(cookieParser())

//for parsing json body of requests
app.use(express.json())

//testing the status of server - running or not!
app.get('/',(req,res) => {
    res.json({message : 'The server is running !'})
})

//testing db connection 
app.get('/db', async (req,res) => {
    const pool = require('./config/db')
    try {
        const answer = await pool.query('SELECT * FROM admins')
        res.json({msg : answer})
    }
    catch (error) {
        console.log(error)
        res.json({msg : error})
    }
})
// //handles all the admin routes (protected)
const authRoutes = require('./routes/authRoutes')

// //handles all the visitor's routes (public)
const tourRoutes = require('./routes/tourRoutes')

// //calling the middlewares
app.use('/api/admin',authRoutes)
app.use('/api/tours',tourRoutes)

app.listen(process.env.PORT,() => {
    console.log('The server is running at http://localhost:',process.env.PORT)
})