const query = require("../db/prisma")

async function createMessage(req, res) {
    res.render("createMessage", { title: "Create Message" })
}

module.exports = {
    createMessage,
}