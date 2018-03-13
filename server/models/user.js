const mongoose = require("mongoose")


// define schema
const userSchema = mongoose.Schema({
    first_name: {
        type: String,
        required: [true, "First name is required."],
        unique: false,
    },
    last_name: {
        type: String,
        required: [true, "Last name is required."],
        unique: false,
    },
    email: {
        type: String,
        required: [true, "Email is required."],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Password is required."],
        unique: false,
    },
})


// create model
const User = mongoose.model("User", userSchema)


// export model
module.exports = User
