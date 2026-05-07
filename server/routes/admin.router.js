const router = require("express").Router()
const Controllars = require("../controllars/admin.controllar.js")
const checkLogin = require("../middlewares/checkLogin.js")

router.post("/login",Controllars.login)
router.put("/cngcred",checkLogin,Controllars.chengeCred)


module.exports = router