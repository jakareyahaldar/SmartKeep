async function saveErrorLog(e){
  const error = { log: e?.stack }
  console.log(e)
}

module.exports = saveErrorLog