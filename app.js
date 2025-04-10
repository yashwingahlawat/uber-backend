const dotenv=require('dotenv')
dotenv.config()
const express=require("express");
const cors=require("cors");
const app=express();
const userRoutes=require("./routes/user.routes.js")
const captainRoutes=require("./routes/captain.routes.js")
const mapsRoutes=require("./routes/maps.routes.js")
const rideRoutes=require('./routes/ride.routes.js')
const cookieParser=require("cookie-parser")

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())


app.get('/',(req,res)=>res.send("hello world"))
app.use('/users',userRoutes)
app.use('/captains',captainRoutes)
app.use('/maps',mapsRoutes)
app.use('/rides',rideRoutes)

module.exports=app;