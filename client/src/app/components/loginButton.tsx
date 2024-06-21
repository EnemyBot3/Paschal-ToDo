'use client';

import React from 'react'
import { useRouter } from "next/navigation";
import { FaUser } from "react-icons/fa";
import { username } from '../helpers/utils';

export default function LoginButton() {
  const router = useRouter();

  const loginButton = () => {
    router.push("/login")
  }

  return (
    <button 
      onClick={loginButton} 
      className="btn bg-violet-600 hover:bg-violet-700 font-bold text-white w-[95px] text-sm shadow-md absolute top-3 left-3 px-0" 
    >
        <FaUser />  LOG-IN
    </button>
  )
}