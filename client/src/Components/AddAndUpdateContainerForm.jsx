import Button from "./Button.jsx"
import Input from "./Input.jsx"
import Textarea from "./Textarea.jsx"
import Select from "./Select.jsx"

export default function AddAndUpdateForm({
  title, buttonText, fildConfig, fildData, submitButtonFunc, hideButton
}){
  return(
    <>
      <div className="p-5 border-[1px] shadow-md mt-5 rounded-2xl">
          <h3 className="font-bold text-xl my-2">{title}</h3>
          <form className="grid gap-3 md:grid-cols-2 max-w-[800px]">
            {
              fildConfig.map((fild)=>{
                if(fild.element === "textarea"){
                  return <Textarea onChangeFunc={fild.chengeEvent} value={fildData[fild.name]} placeholder={fild.placeholder} name={fild.name} />
                }else if(fild.element === "select"){
                  return <Select options={fild.options} onChangeFunc={fild.chengeEvent} value={fildData[fild.name]} name={fild.name} />
                }else{
                  return <Input type={fild?.type} onChangeFunc={fild.chengeEvent} value={fildData[fild.name]} placeholder={fild.placeholder} name={fild.name} />
                }
              })
            }
            { !hideButton && <Button func={submitButtonFunc} text={buttonText ? buttonText : fildData.id ? "Save Edit" : "Save"}  /> }
          </form>
        </div>
    </>
    )
}