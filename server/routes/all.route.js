const router = require("express").Router()
const Controllars = require("../controllars/all.controllar.js")
const checkLogin = require("../middlewares/checkLogin.js")

router.get("/",checkLogin,Controllars.getAll)

module.exports = router