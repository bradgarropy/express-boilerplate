const Mailgun = require("mailgun-js")
const Email = require("email-templates")
const path = require("path")


function send(to, from, subject, template, vars) {

    const templatePath = path.resolve(__dirname, "..", "email")

    const emailOptions = {
        juice: true,
        juiceResources: {
            preserveImportant: true,
            webResources: {relativeTo: templatePath},
        },
        views: {root: templatePath},
    }

    const email = new Email(emailOptions)

    return email.render(template, vars)
        .then(html => {

            const mailgunOptions = {
                apiKey: process.env.MAILGUN_API_KEY,
                domain: process.env.MAILGUN_DOMAIN,
            }

            const mailgun = new Mailgun(mailgunOptions)

            const data = {
                to,
                from,
                subject,
                html,
            }

            return mailgun.messages().send(data)

        })
        .catch(error => {

            console.log(error)

        })

}


// exports
module.exports = {
    send,
}
