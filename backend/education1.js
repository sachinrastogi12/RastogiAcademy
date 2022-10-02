const mongoose = require('mongoose')

// Creating Schema for education
const education1Schema = new mongoose.Schema({             
    id:Number,
    question:String,
    answer:String,
    distractor:Array
})

// Exporting the model
module.exports = mongoose.model("education1",education1Schema)
