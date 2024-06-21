import React from 'react'
import { FaEdit } from "react-icons/fa";

export default function EditButton() {
  return (
    <button className="btn px-1.5 h-10 inline-flex flex-row rounded-lg items-center justify-center p-0 mr-2 bg-yellow-500 hover:bg-yellow-400 border-none text-black">
        <FaEdit className="w-2/3 h-2/3" />
    </button>
  )
}