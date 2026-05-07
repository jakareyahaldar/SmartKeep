import { useRef, useState } from "react"

export default function Select(props){
  let { 
    placeholder,
    name, value,
    onChangeFunc,
    options
  } = props
  
  options = !options ? [] : options
  
  return(
    <>
      <select value={value} name={name} onChange={onChangeFunc} 
      className="px-2 py-1 border-[1px] rounded-md" >
        {
          options?.map((op)=>{
            return <option key={op} value={op}>{op}</option>
          })
        }
      </select>
    </>
    )
}