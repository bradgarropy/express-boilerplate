const express = require("express")
const {check} = require("express-validator/check")

// utils
const token = require("../utils/token")
const password = require("../utils/password")

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
            .then(document => {

                res.send(document)
                return

            })
            .catch(error => {

                if(error.name === "BulkWriteError") {

                    res.status(400)
                    res.send({email: "Email already in use."})
                    return

                }

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
    (req, res) => {

        console.log(`Login: ${req.user.email}`)

        const jwt = token.create(req.user)

        res.send({token: jwt})
        return

    }

)


// read one
router.get(
    "/",
    authenticate.token(),
    (req, res, next) => {

        User.findOne({_id: req.user.id})
            .then(document => {

                res.send(document)
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

        const updates = req.body

        User.findOne({_id: req.user.id})
            .then(document => {

                Object.assign(document, updates)

                document.save()
                    .then(document => {

                        const jwt = token.create(document)

                        res.send({token: jwt})
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
            .then((document) => {

                password.compare(req.body.current_password, document.password)
                    .then(result => {

                        if(!result) {

                            res.status(401)
                            res.send({current_password: "Incorrect password."})
                            return

                        }

                        document.password = req.body.new_password

                        document.save()
                            .then(document => {

                                const jwt = token.create(document)

                                res.send({token: jwt})
                                return

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
