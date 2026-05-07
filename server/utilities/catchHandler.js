const saveErrorLog = require("./saveErrorLog.js")

async function catchHandler(resp,err){
  if(err.name === "Error"){
    resp.status(500).json({message: err.message})
    return
  }
  resp.status(500).json({ message: "Server error!" })
  await saveErrorLog(err)
}

module.exports = catchHandler