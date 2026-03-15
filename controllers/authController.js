const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

// ===============================
// LOGIN
// ===============================
exports.login = async (req, res) => {

    try {

        const { email, password } = req.body

        // ===============================
        // ADMIN LOGIN (.env credentials)
        // ===============================
        if (
            email === process.env.ADMIN_EMAIL &&
            password === process.env.ADMIN_PASSWORD
        ) {

            const token = jwt.sign(
                { role: "admin" },
                process.env.JWT_SECRET,
                { expiresIn: "1d" }
            )

            return res.json({
                message: "Admin login successful",
                token,
                role: "admin"
            })

        }

        // ===============================
        // NORMAL USER LOGIN
        // ===============================
        const user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({
                message: "User not found"
            })
        }

        const match = await bcrypt.compare(password, user.password)

        if (!match) {
            return res.status(400).json({
                message: "Invalid password"
            })
        }

        const token = jwt.sign(
            {
                id: user._id,
                role: "user"
            },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        )

        res.json({
            message: "Login successful",
            token,
            role: "user",
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        })

    } catch (err) {

        console.error(err)

        res.status(500).json({
            message: "Server error"
        })

    }

}


// ===============================
// REGISTER
// ===============================
exports.register = async (req, res) => {

    try {

        const { name, email, password } = req.body

        // check if user already exists
        const existingUser = await User.findOne({ email })

        if (existingUser) {
            return res.status(400).json({
                message: "Email already registered"
            })
        }

        // hash password
        const hashed = await bcrypt.hash(password, 10)

        const user = await User.create({
            name,
            email,
            password: hashed
        })

        res.status(201).json({
            message: "Registration successful"
        })

    } catch (err) {

        console.error(err)

        res.status(500).json({
            message: "Server error"
        })

    }

}
