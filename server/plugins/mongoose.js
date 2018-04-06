function cleanJSON(schema) {

    schema.set("toJSON", {
        virtuals: true,
        versionKey: false,
        transform: function (doc, ret) {
            delete ret._id
        },
    })

}


function deleteEmptyProperties(schema) {

    schema.pre("save", function(next) {

        Object.keys(this._doc).forEach((key) => {

            const value = this[key] === null
                ? undefined
                : this[key]

            this[key] = value

        })

        next()
        return

    })

}


// exports
module.exports = {
    cleanJSON,
    deleteEmptyProperties,
}
