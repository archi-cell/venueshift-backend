const mongoose = require("mongoose")

const eventSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    category: {
        type: String,
        required: true
    },

    date: {
        type: String
    },

    day: {
        type: String
    },

    staff: [String]

})

module.exports = mongoose.model("Event", eventSchema)
