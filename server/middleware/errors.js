function errors(error, req, res, next) {

    console.log(error)

    res.status(500)
    res.json({
        message: "Found an error!",
        error,
    })

    return next()

}


// export
module.exports = errors
