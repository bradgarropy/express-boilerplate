const express = require("express")
const dotenv = require("dotenv")
const bodyparser = require("body-parser")
const cors = require("cors")
const path = require("path")
const mongoose = require("mongoose")

// routes
const users = require("./routes/users")


// middleware
const logger = require("./middleware/logger")
const errors = require("./middleware/errors")


// environment
dotenv.config()


// application
const app = express()


// settings
app.set("json spaces", 4)


// database
mongoose.connect(process.env.MONGODB_URI)


// middleware
app.use(cors())
app.use(bodyparser.json())
app.use(logger)


// routes
app.use(express.static(path.join(__dirname, "public")))
app.use("/users", users)


// errors
app.use(errors)


// listen
app.listen(process.env.PORT, () => {

    console.log("Server listening on port %s.", process.env.PORT)

})
