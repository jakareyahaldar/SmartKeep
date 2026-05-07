export default function Textarea(props){
  const { 
    placeholder,
    name, value,
    onChangeFunc
  } = props
  
  
  return(
    <>
      <textarea
      className="px-2 py-1 border-[1px] rounded-md"
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChangeFunc}
      ></textarea>
    </>
    )
}