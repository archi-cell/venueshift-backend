require("dotenv").config()

const express = require("express")
const cors = require("cors")

const connectDB = require("./config/db")

const authRoutes = require("./routes/authRoutes")
const eventRoutes = require("./routes/eventRoutes")
const staffRoutes = require("./routes/staffRoutes")
const notificationRoutes = require("./routes/notificationRoutes")

const app = express()

/* ==============================
   CONNECT DATABASE
================================*/
connectDB()

/* ==============================
   MIDDLEWARE
================================*/
app.use(cors())
app.use(express.json())

/* ==============================
   API TEST ROUTE
================================*/
app.get("/", (req, res) => {
    res.send("VenueShift API Running")
})

/* ==============================
   ROUTES
================================*/
app.use("/api/auth", authRoutes)
app.use("/api/events", eventRoutes)
app.use("/api/staff", staffRoutes)
app.use("/api/notifications", notificationRoutes)

/* ==============================
   404 HANDLER
================================*/
app.use((req, res) => {
    res.status(404).json({
        message: "Route not found"
    })
})

/* ==============================
   ERROR HANDLER
================================*/
app.use((err, req, res, next) => {
    console.error(err.stack)

    res.status(500).json({
        message: "Server error"
    })
})

/* ==============================
   START SERVER
================================*/
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})