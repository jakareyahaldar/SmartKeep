export default function Input({ placeholder, value, onChangeFunc, name, type, css, list }){
  const placeholderText = placeholder || "write Here.."
  const inputValue = value || ""
  const onChangeFunction = onChangeFunc || null
  const inputType = type || "text"
  const csss = css || ""
  
  return <input
      className={"px-2 py-1 border-[1px] rounded-md " + csss}
      placeholder={placeholderText} 
      value={inputValue}
      onChange={onChangeFunction}
      name={name}
      type={inputType}
    />
}