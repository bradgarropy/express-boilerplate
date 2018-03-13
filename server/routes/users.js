const express = require("express")
const {check} = require("express-validator/check")
const jwt = require("jsonwebtoken")

// models
const User = require("../models/user")

// middleware
const validate = require("../middleware/validate")
const authenticate = require("../middleware/authenticate")


// router
const router = express.Router()


// create
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


// read one
router.get("/:id", (req, res) => {

    res.send("read one")
    return

})


// read all
router.get("/", (req, res) => {

    res.send("read all")
    return

})


// update
router.patch("/:id", (req, res) => {

    res.send("update")
    return

})


// delete
router.delete("/:id", (req, res) => {

    res.send("delete")
    return

})


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

        const payload = {
            id: req.user._id,
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            email: req.user.email,
        }

        const token = jwt.sign(payload, process.env.SECRET)

        res.send({token})
        return

    }

)


// export
module.exports = router
