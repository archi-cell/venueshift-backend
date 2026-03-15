const mongoose = require("mongoose")

const staffSchema = new mongoose.Schema({

name:String,
event:String

})

module.exports = mongoose.model("Staff",staffSchema)