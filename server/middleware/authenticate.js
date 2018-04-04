const jwt = require("jsonwebtoken")
const password = require("../utils/password")

// models
const User = require("../models/user")


function user() {

    const middleware = function(req, res, next) {

        const email = req.body.email

        User.findOne({email}).exec()
            .then(user => {

                if(!user) {

                    console.log(`Login attempt failed: ${email}`)

                    res.status(401)
                    res.send({email: "User does not exist."})
                    return

                }

                password.compare(req.body.password, user.password)
                    .then(result => {

                        if(!result) {

                            console.log(`Login attempt failed: ${email}`)

                            res.status(401)
                            res.send({password: "Incorrect password."})
                            return

                        }

                        req.user = user

                        next()
                        return

                    })

            })
            .catch(error => {

                next(error)
                return

            })

    }

    return middleware

}


function token() {

    const middleware = function(req, res, next) {

        const authorization = req.headers.authorization

        if(!authorization) {

            res.status(401)
            res.send({message: "No token provided."})
            return

        }

        const token = authorization.split(" ")[1]

        jwt.verify(token, process.env.SECRET, (error, decoded) => {

            if(error) {

                res.status(401)
                res.send({message: "Invalid token."})
                return

            }

            User.findById(decoded.id, (error, dbUser) => {

                if(error) {

                    res.status(401)
                    res.send({message: "Invalid token."})
                    return

                }

                const user = {
                    id: dbUser._id,
                    first_name: dbUser.first_name,
                    last_name: dbUser.last_name,
                    email: dbUser.email,
                }

                req.user = user
                req.token = token

                next()
                return

            })

        })

    }

    return middleware

}


// exports
module.exports = {
    user,
    token,
}
