const express = require("express")
const {check} = require("express-validator/check")
const jwt = require("jsonwebtoken")

// utils
const email = require("../utils/email")

// models
const User = require("../models/user")

// middleware
const validate = require("../middleware/validate")
const authenticate = require("../middleware/authenticate")


// router
const router = express.Router()


// register
router.post(
    "/",
    [
        check("first_name").not().isEmpty().withMessage("First name is required."),
        check("last_name").not().isEmpty().withMessage("Last name is required."),
        check("email").not().isEmpty().withMessage("Email is required."),
        check("email").isEmail().withMessage("Invalid email."),
        check("password").not().isEmpty().withMessage("Password is required."),
        check("confirmation").not().isEmpty().withMessage("Password confirmation is required."),
        check("confirmation").custom((value, {req}) => value === req.body.password).withMessage("Passwords must match."),
    ],
    validate(),
    (req, res, next) => {

        User.create(req.body)
            .then(user => {

                const token = user.createActivationToken()

                const to = user.email
                const from = "Boilerplate <do-not-reply@boilerplate.com>"
                const subject = "Account Activation"
                const vars = {link: `${req.headers.origin}/activate/${token}`}

                email.send(to, from, subject, "user-activation", vars)
                    .then(() => {

                        res.json(user)
                        return

                    })

            })
            .catch(error => {

                if(error.name === "BulkWriteError") {

                    res.status(400)
                    res.json({email: "Email already in use."})
                    return

                }

                next(error)
                return

            })

    }
)


// verify
router.post(
    "/activate",
    (req, res, next) => {

        const token = jwt.decode(req.body.token)

        if(!token) {

            res.status(403)
            res.json({message: "Invalid activation token."})
            return

        }

        User.findById(token.id)
            .then(user => {

                if(!user) {

                    res.status(403)
                    res.json({message: "Invalid activation token."})
                    return

                }

                jwt.verify(req.body.token, process.env.SECRET, error => {

                    if(error) {

                        let message = null

                        switch(error.name) {

                            case "TokenExpiredError":
                                message = "Expired activation token."
                                break

                            case "JsonWebTokenError":
                                message = "Invalid activation token."
                                break

                        }

                        res.status(403)
                        res.json({message})
                        return

                    }

                    user.active = true

                    user.save()
                        .then(() => {

                            const to = user.email
                            const from = "Boilerplate <do-not-reply@boilerplate.com>"
                            const subject = "Welcome to Boilerplate"
                            const vars = {link: `${req.headers.origin}/login`}

                            email.send(to, from, subject, "welcome", vars)
                                .then(() => {

                                    res.json(user)
                                    return

                                })

                        })

                })

            })
            .catch(error => {

                next(error)
                return

            })

    }
)


// login
router.post(
    "/login",
    [
        check("email").not().isEmpty().withMessage("Email is required."),
        check("email").isEmail().withMessage("Invalid email."),
        check("password").not().isEmpty().withMessage("Password is required."),
    ],
    validate(),
    authenticate.user(),
    (req, res, next) => {

        User.findById(req.user.id)
            .then(user => {

                console.log(`Login: ${req.user.email}`)

                const token = user.createAuthenticationToken()

                res.json({token})
                return

            })
            .catch(error => {

                next(error)
                return

            })

    }

)


// read one
router.get(
    "/",
    authenticate.token(),
    (req, res, next) => {

        User.findById(req.user.id)
            .then(user => {

                res.json(user)
                return

            })
            .catch(error => {

                next(error)
                return

            })

    }

)


// update
router.patch(
    "/",
    authenticate.token(),
    (req, res, next) => {

        User.findById(req.user.id)
            .then(user => {

                const updates = req.body
                delete updates.password

                Object.assign(user, updates)

                user.save()
                    .then(user => {

                        const token = user.createAuthenticationToken()

                        res.json({token})
                        return

                    })

            })
            .catch(error => {

                next(error)
                return

            })

    }

)


// change password
router.post(
    "/password",
    [
        check("current_password").not().isEmpty().withMessage("Current password is required."),
        check("new_password").not().isEmpty().withMessage("New password is required."),
        check("confirmation").not().isEmpty().withMessage("Password confirmation is required."),
        check("confirmation").custom((value, {req}) => value === req.body.new_password).withMessage("Passwords must match."),
    ],
    validate(),
    authenticate.token(),
    (req, res, next) => {

        User.findById(req.user.id)
            .then(user => {

                user.authenticatePassword(req.body.current_password)
                    .then(result => {

                        if(!result) {

                            res.status(401)
                            res.json({current_password: "Incorrect password."})
                            return

                        }

                        user.password = req.body.new_password

                        user.save()
                            .then(user => {

                                const to = user.email
                                const from = "Boilerplate <do-not-reply@boilerplate.com>"
                                const subject = "Password Change Confirmation"
                                const vars = {link: `${req.headers.origin}/login`}

                                email.send(to, from, subject, "password-change", vars)
                                    .then(() => {

                                        const token = user.createAuthenticationToken()

                                        res.json({token})
                                        return

                                    })

                            })

                    })

            })
            .catch(error => {

                next(error)
                return
            })

    }

)


// forgot password
router.post(
    "/forgot",
    [
        check("email").not().isEmpty().withMessage("Email is required."),
        check("email").isEmail().withMessage("Invalid email."),
    ],
    validate(),
    (req, res, next) => {

        User.findOne({email: req.body.email})
            .then(user => {

                if(!user) {

                    res.status(404)
                    res.json({email: "User does not exist."})
                    return

                }

                const token = user.createResetToken()

                const to = req.body.email
                const from = "Boilerplate <do-not-reply@boilerplate.com>"
                const subject = "Password Reset Request"
                const vars = {link: `${req.headers.origin}/reset/${token}`}

                email.send(to, from, subject, "password-forgot", vars)
                    .then(() => {

                        res.json({message: "Password reset email sent!"})
                        return

                    })

            })
            .catch(error => {

                next(error)
                return

            })

    }

)


// reset password
router.post(
    "/reset",
    [
        check("new_password").not().isEmpty().withMessage("New password is required."),
        check("confirmation").not().isEmpty().withMessage("Password confirmation is required."),
        check("confirmation").custom((value, {req}) => value === req.body.new_password).withMessage("Passwords must match."),
    ],
    validate(),
    (req, res, next) => {

        const token = jwt.decode(req.body.token)

        if(!token) {

            res.status(403)
            res.json({message: "Invalid password reset token."})
            return

        }

        User.findById(token.id)
            .then(user => {

                if(!user) {

                    res.status(403)
                    res.json({message: "Invalid password reset token."})
                    return

                }

                jwt.verify(req.body.token, user.password, error => {

                    if(error) {

                        let message = null

                        switch(error.name) {

                            case "TokenExpiredError":
                                message = "Expired password reset token."
                                break

                            case "JsonWebTokenError":
                                message = "Invalid password reset token."
                                break

                        }

                        res.status(403)
                        res.json({message})
                        return

                    }

                    user.password = req.body.new_password

                    user.save()
                        .then(() => {

                            const to = user.email
                            const from = "Boilerplate <do-not-reply@boilerplate.com>"
                            const subject = "Password Reset Confirmation"
                            const vars = {link: `${req.headers.origin}/login`}

                            email.send(to, from, subject, "password-reset", vars)
                                .then(() => {

                                    res.json({message: "Password reset successfully!"})
                                    return

                                })

                        })

                })

            })
            .catch(error => {

                next(error)
                return

            })

    }

)


// export
module.exports = router
