const jwt = require("jsonwebtoken")


function create(user) {

    const payload = {
        id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
    }

    const token = jwt.sign(payload, process.env.SECRET)

    return token

}


// exports
module.exports = {
    create,
}
