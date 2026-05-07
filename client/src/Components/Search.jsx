import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"

export default function Search(){
  
  
  const dataBase = useSelector( e=> e.my_state.data )
  // search uses variable
  const [search,setSearch] = useState("")
  const [results,setResults] = useState({})
  
  //search toggle uses var
  const [on,setOn] = useState(false);
  const srcTgcss = on ? " " : " hidden"
  
  useEffect(()=>{
    function SearchQuery(search,dataBase){
      const ResultObj = {}
      Object.keys(dataBase).forEach((type)=>{
        dataBase[type].forEach((item)=>{
          const tstr = ItemsToStr(item)
          if(tstr.includes(search.toLowerCase())){
            const isInitate = ResultObj[type] !== undefined 
            if(!isInitate) ResultObj[type] = []
            ResultObj[type].push(item)
          }
        })
      })
      return ResultObj
    }
    
    if(search){
      setResults(SearchQuery(search,dataBase))
    }else{
      setResults({})
    }
    
  },[search])
  
  function ItemsToStr(items){
    const str = Object.values(items).map(e=>e).join(", ").toLowerCase()
    return str
  }
  
  
  // Event Handler
  function toggle(){
    setOn(!on);
    setSearch("")
  }
  function ChangeHandler(e){
    setSearch(e.target.value)
  }
  
  return(
    <>
      <div className="fixed top-5 right-5 bg-black rounded-2xl px-3 py-3 flex gap-2.5 items-center transition-[2s]">
        <input
          type="text"
          value={search}
          onChange={ChangeHandler}
          placeholder="Search..."
          className={"bg-transparent outline-0 text-white placeholder-[#998a95] inputOpen " + srcTgcss  }
        />
        <i onClick={toggle} className=" text-white fa-brands fa-sistrix"></i>
      </div>
      {
        Object.keys(results).length > 0 && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 min-w-[90%] md:w-1/2 p-3.5 bg-black text-white rounded-3xl grid gap-2.5">
        {
          Object.keys(results).map( key => results[key].map(item=> <SrcResCard item={item} type={key} /> ) )
        }
      </div>
        ) 
      }
    </>
    )
}

const heading_config = {
  passwords:"site",
  notes:"title",
  tasks:"title",
  contacts:"name",
  links:"title"
}
const icon_config = {
  passwords:"fa-solid fa-key",
  notes:"fa-solid fa-note-sticky",
  tasks:"fa-solid fa-clipboard-check",
  contacts:"fa-regular fa-address-book",
  links:"fa-solid fa-link"
}

function SrcResCard({item, type}){
  
  const k = Object.keys(item)
  const keys = k.filter(ke => (ke!=="id" && ke!== heading_config[type] ) )
  
  return(
    <div className="relative bg-blue-700 p-3 w-full rounded-3xl">
      <i className={"absolute right-4 " + icon_config[type]}></i>
      <h3 className="font-bold text-xl">{item[heading_config[type]]}</h3>
      {
        keys.map((key)=>{
          if( key === "url" || key==="facebook" ){
            return <Link className="text-[#00b619]" to={item[key]}>Go to See</Link>
          }else{
            return <p>{`${key}: ${item[key]}`}</p>
          }q
        })
      }
    </div>
    )
}
