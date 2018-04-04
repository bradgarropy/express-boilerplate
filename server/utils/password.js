const bcrypt = require("bcrypt")


function hash(password) {

    return bcrypt.hash(password, 10)

}


function compare(password, hashedPassword) {

    return bcrypt.compare(password, hashedPassword)

}


// exports
module.exports = {
    hash,
    compare,
}
