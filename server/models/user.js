const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const plugins = require("../plugins/mongoose")


// plugins
mongoose.plugin(plugins.cleanJSON)
mongoose.plugin(plugins.deleteEmptyProperties)


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


// middleware
userSchema.pre("save", function(next) {

    if(!this.isModified("password")) {
        next()
        return
    }

    bcrypt.hash(this.password, 10)
        .then(hash => {

            this.password = hash

            next()
            return

        })
        .catch(error => {

            next(error)
            return

        })

})


// instance methods
userSchema.methods.authenticate_password = function(password) {

    return bcrypt.compare(password, this.password)

}


// create model
const User = mongoose.model("User", userSchema)


// export model
module.exports = User
