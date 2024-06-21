import React, {FC} from 'react'
import { FaRegSave } from "react-icons/fa";

// interfaces
interface Params { 
  onClick: () => void 
  text?: string
}

const SaveButton:FC<Params> = ({ onClick, text }) => {
  return (
    <button 
      onClick={onClick} 
      className="btn inline-flex flex-grow rounded-lg items-center justify-center px-6 bg-violet-600 hover:bg-violet-500 border-none text-lg h-12 font-bold text-white shadow-md"
    >
      <FaRegSave className="w-[25px] h-[25px] mr-3" /> {text? text : "SAVE"}
    </button>

  )
}

export default SaveButton