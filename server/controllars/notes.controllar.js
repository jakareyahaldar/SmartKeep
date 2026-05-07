const NOTE = require("../db/models/note.model.js")
const catchHandler = require("../utilities/catchHandler.js")

module.exports = {
  getAll: async ()=>{
    try{
      return await NOTE.find().sort({ createdAt: -1 })
    }catch(err){
      return []
    }
  },
  
  add: async (req,resp)=>{
    console.log(req.cookies)
    try{
      const {title,description} = req.body
      if( !title && !description ) throw Error("Please add valid Note.")
      const note = new NOTE(req.body)
      const n = await note.save()
      resp.json(n)
    }catch(err){catchHandler(resp,err)}
  },
  
  put: async (req,resp)=>{
    try{
      const { _id } = req.params || {}
      if(!_id) throw Error("Note note found!")
      await NOTE.findOneAndUpdate({_id},req.body)
      resp.json({message: "ok"})
    }catch(err){catchHandler(resp,err)}
  },
  
  remove: async (req,resp)=>{
    try{
      const { _id } = req.params
      if(!_id) throw Error("Note id not found!")
      await NOTE.findOneAndDelete(req.params)
      resp.json({mesaage: "ok"})
    }catch(err){catchHandler(resp,err)}
  }
  
} // end object