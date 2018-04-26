const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
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
    active: {
        type: Boolean,
        required: [true, "Active is required."],
        unique: false,
        default: false,
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
userSchema.methods.authenticatePassword = function(password) {

    return bcrypt.compare(password, this.password)

}


userSchema.methods.createAuthenticationToken = function() {

    const payload = {
        id: this._id,
        first_name: this.first_name,
        last_name: this.last_name,
        email: this.email,
    }

    const options = {
        expiresIn: "1w",
    }

    return jwt.sign(payload, process.env.SECRET, options)

}


userSchema.methods.createResetToken = function() {

    const payload = {
        id: this._id,
    }

    const options = {
        expiresIn: "1d",
    }

    return jwt.sign(payload, this.password, options)

}


userSchema.methods.createActivationToken = function() {

    const payload = {
        id: this._id,
    }

    const options = {
        expiresIn: "1d",
    }

    return jwt.sign(payload, process.env.SECRET, options)

}


// create model
const User = mongoose.model("User", userSchema)


// export model
module.exports = User
