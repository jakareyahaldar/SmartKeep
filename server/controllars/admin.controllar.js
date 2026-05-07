const ADMIN = require("../db/models/admin.model.js")
const { getHash, verifyHash } = require("../lib/jwt.js")
const catchHandler = require("../utilities/catchHandler.js")

module.exports = {
  
  // Login Feature
  login : async (req,resp)=>{
    try{
      const { email,password } = req.body || {}
      if(!email || !password) throw Error("Email or Password not found!")
      const admin = await ADMIN.getAdmin()
      for (let key of ["email","password"] ){
        if(key === "password"){
          const { password } = verifyHash(admin.password)
          admin[key] = password
        }
        if( admin[key] !== req.body[key]?.trim() ) throw Error(`Invalid ${key}`)
      }
      const token = getHash({_id:admin._id})
      resp.json({token})
    }catch(err){ catchHandler(resp,err) }
  },
  
  // change credeintials
  chengeCred: async (req,resp)=>{
    try{
      const { old, New } = req.body || {} // extract previous and new credeintials
      // if invalid or not found data then return with response
      if( !old.email || !old.password) throw Error("Please fill old crwdiantials!!!")
      if( !New.email || !New.password) throw Error("Please fill new crwdiantials!!")
      /// now validate old credeintials
      const { email, password } = old
      const admin = await ADMIN.getAdmin() // get admin data
      const { password: decodedPass } = verifyHash(admin.password) // get deccoded password
      // match email and password
      if(email !== admin.email) throw Error("Faild because wrong Email!")
      if(password !== decodedPass) throw Error("Faild because wrong Password!")
      // passed on all test 
      // update the credeintials
      if(New.password){ // if password then hash the password
        const token = getHash({ password: New.password })
        if(!token) throw Error("Faild to Change!")
        New.password = token
      }
      await ADMIN.findOneAndUpdate({_id:admin._id},New)
      resp.json({message: "ok"})
    }catch(err){catchHandler(resp,err)}
  }
  
} // end object