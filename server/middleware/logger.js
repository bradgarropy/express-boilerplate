const moment = require("moment")


function logger(request, response, next) {

    // date
    const date = moment().format("MM-DD-YYYY hh:mm:ss A")

    // method
    const method = request.method

    // url
    const url = request.url

    // body
    const body = JSON.stringify(request.body)

    // log entry
    const message = `[${date}] "${method} ${url}" ${body}`

    // log
    console.log(message)

    // next
    next()
    return

}


// exports
module.exports = logger
