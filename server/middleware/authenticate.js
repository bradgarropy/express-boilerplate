const User = require("../models/user")


function user() {

    const middleware = function(req, res, next) {

        const email = req.body.email
        const password = req.body.password

        User.findOne({email}).exec()
            .then(user => {

                if(!user) {
                    res.status(401)
                    res.send({email: "User does not exist."})
                    return
                }

                if(password !== user.password) {
                    res.status(401)
                    res.send({password: "Incorrect password."})
                    return
                }

                req.user = user
                next()
                return

            })
            .catch(error => {
                next(error)
                return
            })

    }

    return middleware

}


function token() {

    const middleware = function() {

    }

    return middleware

}


// exports
module.exports = {
    user,
    token,
}
