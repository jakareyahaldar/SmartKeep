const jwt = require("jsonwebtoken")
const Secret = process.env.SECRATE

module.exports = {
  getHash: (data)=>{
    try{
      const hash = jwt.sign( data, Secret )
      return hash
    }catch(err){
      console.log(err)
      return null
    }
  },
  verifyHash: (hash)=>{
    const decoded = jwt.verify(hash,Secret)
    return decoded
  }
}