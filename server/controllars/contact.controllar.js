const catchHandler = require("../utilities/catchHandler.js")
const CONTACT = require("../db/models/contact.model.js")


module.exports = {
  // Get all
  getAll: async ()=>{
    try{
      return await CONTACT.find().sort({ createdAt: -1 })
    }catch(err){
      return []
    }
  },
  
  // add new one 
  add: async (req,resp)=>{
    try{
      // validate data
      for(const key of ["name","phone"]){
        if(!req.body[key] && typeof(req.body[key]) !== "string" ) throw Error("Please Send Valid Data!")
      }
      const new_contact = new CONTACT(req.body)
      const contact = await new_contact.save()
      resp.json(contact)
    }catch(err){catchHandler(resp,err)}
  },
  
  // EDIT PASSWORD
  put: async (req,resp)=>{
    try{
      const { _id } = req.params || {}
      if(!_id) throw Error("Item not found!") // searching id 
      // validate data
      for(const key of ["name","phone"]){
        if(!req.body[key] && typeof(req.body[key]) !== "string" ) throw Error("Please Send Valid Data!")
      }
      // save 
      await CONTACT.findOneAndUpdate( { _id }, req.body )
      resp.json({ message: "ok" })
    }catch(err){catchHandler(resp,err)}
  },
  
  // DELETE PASSWORD
  remove: async (req,resp)=>{
    try{
      const { _id } = req.params || {} // extract _id
      if(!_id) throw Error("Item not found!") // send error
      await CONTACT.findOneAndDelete({ _id }) // delete item
      resp.json({message: "ok"}) // send success response
    }catch(err){catchHandler(resp,err)}
  },
  
}