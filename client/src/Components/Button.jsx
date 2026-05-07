export default function Button({ text, func }){
  return <button 
      onClick={func} 
      className="px-5 py-2 rounded-md shadow-md bg-red-500 text-white mt-3 hover:bg-amber-100 hover:text-black transition-all transition-[1s]"
      >{text}</button>
}