'use client';

import React from 'react'
import { useRouter } from "next/navigation";
import { MdOutlineLibraryAdd } from "react-icons/md";

export default function AddTodoButton() {
  const router = useRouter();

  const addTodoButton = () => {
    router.push("/add")
  }

  return (
    <button 
      onClick={addTodoButton} 
      className="btn bg-violet-600 hover:bg-violet-700 text-lg font-bold text-white w-[90%] mt-auto mb-2 shadow-md"
    >
      <MdOutlineLibraryAdd /> 
      ADD
    </button>
  )
}