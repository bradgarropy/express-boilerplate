const Mailgun = require("mailgun-js")


function send(from, to, subject, text) {

    const data = {
        from,
        to,
        subject,
        text,
    }

    const mailgun = new Mailgun({
        apiKey: process.env.MAILGUN_API_KEY,
        domain: process.env.MAILGUN_DOMAIN,
    })

    return mailgun.messages().send(data)

}


// exports
module.exports = {
    send,
}
