const mongoose=require("mongoose")
const dotenv=require('dotenv')
dotenv.config()
function connectToDb(){
    mongoose.connect(process.env.DB_CONNECT)
    .then(()=>console.log("Connected to db"))
    .catch(err=>console.log(err))
}
module.exports=connectToDb;