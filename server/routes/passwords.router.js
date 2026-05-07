const router = require("express").Router()
const Controllars = require("../controllars/password.controllar.js")
const checkLogin = require("../middlewares/checkLogin.js")

router.post("/",checkLogin,Controllars.add)
router.delete("/:_id",checkLogin,Controllars.remove)
router.put("/:_id",checkLogin,Controllars.put)


module.exports = router