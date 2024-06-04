const mongoose = require("mongoose");

const subscribers_schema = new mongoose.Schema({
 name:{
    type:String,
    require:true
 },
 subscriberTochannel:{
    type:String,
    require:true
 },
 DateOfSubscription : {
    type:Date,
    require:true,
    default: Date.now
 }
}
)

module.exports = mongoose.model('Subscriber', subscribers_schema)