const express = require("express")
const {check} = require("express-validator/check")

// middleware
const validate = require("../middleware/validate")
const authenticate = require("../middleware/authenticate")

// utils
const email = require("../utils/email")


// router
const router = express.Router()


// feedback
router.post(
    "/",
    [
        check("feedback").not().isEmpty().withMessage("Feedback is required."),
    ],
    validate(),
    authenticate.token(),
    (req, res, next) => {

        const to = "bradgarropy@gmail.com"
        const from = `${req.user.first_name} ${req.user.last_name} <${req.user.email}>`
        const subject = `Feedback from ${req.user.first_name} ${req.user.last_name}`
        const vars = {
            user: req.user,
            feedback: req.body.feedback,
        }

        email.send(to, from, subject, "feedback", vars)
            .then(() => {

                res.json({message: "Thank you for your feedback!"})
                return

            })
            .catch(error => {

                next(error)
                return

            })

    }

)


// export
module.exports = router
