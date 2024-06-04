const env = require('dotenv');
env.config();

const mongoose = require("mongoose");
mongoose.connect(process.env.DB)
const db = mongoose.connection

db.on('error',(err)=>console.log(err.message))
db.once('open', ()=>console.log("connection established"))



const express = require("express");
const app = express();

app.use(express.json())
const subscriber_routes = require('./routes/subscribers')
app.use('/subscribers' , subscriber_routes)

app.listen(3000,()=>{
    console.log("server is up ")
})