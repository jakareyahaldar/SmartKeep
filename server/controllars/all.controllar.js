const NoteControllar = require("./notes.controllar.js")
const PassControllar = require("./password.controllar.js")
const contactControllar = require("./contact.controllar.js")
const linkControllar = require("./link.controllar.js")
const taskControllar = require("./task.controllar.js")

module.exports = {
  getAll : async (req,resp)=>{
    const notes = await NoteControllar.getAll()
    const passwords = await PassControllar.getAll()
    const contacts = await contactControllar.getAll()
    const links = await linkControllar.getAll()
    const tasks = await taskControllar.getAll()
    resp.json({ notes, passwords, contacts, links, tasks })
  }
}