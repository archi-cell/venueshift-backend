const Staff = require("../models/Staff")

exports.getStaff = async (req, res) => {

    try {

        const staff = await Staff.find()

        res.json(staff)

    } catch (err) {

        res.status(500).json({
            message: "Error fetching staff"
        })

    }

}