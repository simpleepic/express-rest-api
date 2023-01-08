const testPost = (req, res) => {
    res.status(200).json({
        status: "success",
        data: "Post working"
    })
}

module.exports = {testPost}