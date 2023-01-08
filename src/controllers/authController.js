const testAuth = (req, res) => {
    res.status(200).json({
        status: "success",
        data: "Auth working"
    })
}

module.exports = {testAuth}