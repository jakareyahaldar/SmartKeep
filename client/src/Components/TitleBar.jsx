export default function TitleBar({title,text,icon}) {
  return(
    <div>
      <div className="flex gap-1 items-center">
        <i class={icon}></i>
        <h2 className="titleFont text-2xl">{title}</h2>
      </div>
      <p className="">
        {text}
      </p>
    </div>
  )
}