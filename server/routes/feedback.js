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

        const from = req.user.email
        const to = "bradgarropy@gmail.com"
        const subject = `Boilerplate - Feedback from ${req.user.first_name} ${req.user.last_name}`
        const feedback = req.body.feedback

        email.send(from, to, subject, feedback)
            .then(() => {

                res.json({mesage: "Thank you for your feedback!"})
                return

            })
            .catch((error) => {

                next(error)
                return

            })

    }

)


// export
module.exports = router
