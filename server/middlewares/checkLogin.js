const ADMIN = require("../db/models/admin.model.js")
const { verifyHash } = require("../lib/jwt.js")

async function checkLogin(req,resp,next){
  try{
    const  {jack_system}  = req.cookies || {}
    if(!jack_system) {
      resp.status(500).json({message: "please Login first"})
      return
    }
    const admin = await ADMIN.getAdmin()
    const decoded = verifyHash(jack_system)
    if(decoded._id !== String(admin._id)) {
      resp.status(500).json({message: "invalid id"})
      return
    }
    next()
  }catch(err){
    resp.status(500).json({message: "server error checking login!"})
  }
}

module.exports = checkLogin