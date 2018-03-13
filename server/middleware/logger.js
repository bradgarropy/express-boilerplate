const moment = require("moment")


function logger(request, response, next) {

    // timestamp
    const timestamp = moment().format("MM-DD-YYYY hh:mm:ss A")

    // entry
    const entry = `[${timestamp}] "${request.method} ${request.url}" ${JSON.stringify(request.body)}`

    // log
    console.log(entry)

    // next
    next()

}


// export logger
module.exports = logger
