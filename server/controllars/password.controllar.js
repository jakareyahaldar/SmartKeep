const catchHandler = require("../utilities/catchHandler.js")
const PASSWORDS = require("../db/models/password.model.js")


module.exports = {
  // Get all
  getAll: async ()=>{
    try{
      return await PASSWORDS.find().sort({ createdAt: -1 })
    }catch(err){
      return []
    }
  },
  
  // add new one 
  add: async (req,resp)=>{
    try{
      // validate data
      for(const key of ["site","password"]){
        if(!req.body[key] && typeof(req.body[key]) !== "string" ) throw Error("Please Send Valid Data!")
      }
      const password = new PASSWORDS(req.body)
      const p = await password.save()
      resp.json(p)
    }catch(err){catchHandler(resp,err)}
  },
  
  // EDIT PASSWORD
  put: async (req,resp)=>{
    try{
      const { _id } = req.params || {}
      if(!_id) throw Error("Item not found!") // searching id 
      // validate data
      for(const key of ["site","password"]){
        if(!req.body[key] && typeof(req.body[key]) !== "string" ) throw Error("Please Send Valid Data!")
      }
      // save 
      await PASSWORDS.findOneAndUpdate( {_id}, req.body )
      resp.json({ message: "ok" })
    }catch(err){catchHandler(resp,err)}
  },
  
  // DELETE PASSWORD
  remove: async (req,resp)=>{
    try{
      const { _id } = req.params || {} // extract _id
      if(!_id) throw Error("Item not found!") // send error
      await PASSWORDS.findOneAndDelete({_id}) // delete item
      resp.json({message: "ok"}) // send success response
    }catch(err){catchHandler(resp,err)}
  },
  
}