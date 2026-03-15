const Event = require("../models/Event")
const Staff = require("../models/Staff")
const Notification = require("../models/Notification")

exports.createEvent = async(req,res)=>{

try{

const {name,category,date,day,staff} = req.body

const event = await Event.create({
name,
category,
date,
day,
staff
})

for(let member of staff){

await Staff.create({
name:member,
event:name
})

await Notification.create({
message:`${member} assigned to ${name}`
})

}

res.json({
message:"Event created",
event
})

}catch(err){

res.status(500).json({
message:"Error creating event"
})

}

}


exports.getEvents = async(req,res)=>{

const events = await Event.find()

res.json(events)

}