const { body, validationResult } = require("express-validator");


async function signUp(req, res) {
    res.render("signUp", { title: "Sign up page"})
}

async function signin(req, res) {
    res.render("signIn", { title: "Sign In" })
}


module.exports = {
    signUp,
    signin,
}