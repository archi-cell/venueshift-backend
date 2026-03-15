const Notification = require("../models/Notification")

exports.getNotifications = async (req, res) => {

    try {

        const notifications = await Notification.find().sort({ date: -1 })

        res.json(notifications)

    } catch (err) {

        res.status(500).json({
            message: "Error fetching notifications"
        })

    }

}