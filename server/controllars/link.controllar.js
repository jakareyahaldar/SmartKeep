const catchHandler = require("../utilities/catchHandler.js")
const LINKS = require("../db/models/link.model.js")


module.exports = {
  // Get all
  getAll: async ()=>{
    try{
      return await LINKS.find().sort({ createdAt: -1 })
    }catch(err){
      return []
    }
  },
  
  // add new one 
  add: async (req,resp)=>{
    try{
      // validate data
      for(const key of ["url"]){
        if(!req.body[key] && typeof(req.body[key]) !== "string" ) throw Error("Please Send Valid Data!")
      }
      const new_link = new LINKS(req.body)
      const link = await new_link.save()
      resp.json(link)
    }catch(err){catchHandler(resp,err)}
  },
  
  // EDIT PASSWORD
  put: async (req,resp)=>{
    try{
      const { _id } = req.params || {}
      if(!_id) throw Error("Item not found!") // searching id 
      // validate data
      for(const key of ["url"]){
        if(!req.body[key] && typeof(req.body[key]) !== "string" ) throw Error("Please Send Valid Data!")
      }
      // save 
      await LINKS.findOneAndUpdate( { _id }, req.body )
      resp.json({ message: "ok" })
    }catch(err){catchHandler(resp,err)}
  },
  
  // DELETE PASSWORD
  remove: async (req,resp)=>{
    try{
      const { _id } = req.params || {} // extract _id
      if(!_id) throw Error("Item not found!") // send error
      await LINKS.findOneAndDelete({ _id }) // delete item
      resp.json({message: "ok"}) // send success response
    }catch(err){catchHandler(resp,err)}
  },
  
}