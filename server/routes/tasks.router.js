const router = require("express").Router()
const Controllars = require("../controllars/task.controllar.js")
const checkLogin = require("../middlewares/checkLogin.js")

router.post("/",checkLogin,Controllars.add)
router.put("/:_id",checkLogin,Controllars.put)
router.delete("/:_id",Controllars.remove)


module.exports = router