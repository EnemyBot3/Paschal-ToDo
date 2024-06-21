'use client';

import React from 'react'
import { IoChevronBack } from "react-icons/io5";
import { useRouter } from "next/navigation";

export default function CancelButton() {
    const router = useRouter();

    const CancelButton = () => {
        router.back();
    }

  return (
    <button 
      onClick={CancelButton}
      className="btn px-1.5 inline-flex flex-grow rounded-lg items-center justify-center p-0 mr-2 bg-gray-500 border-none text-lg h-12 font-bold text-white shadow-md" >
        <IoChevronBack className="w-[25px] h-[25px] mr-1 md:-ml-6" />
        BACK
    </button>
  )
}