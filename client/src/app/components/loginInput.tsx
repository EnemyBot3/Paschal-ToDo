'use client';

import React, { FC, useState } from 'react'
import { IoIosEye } from "react-icons/io";
import { FaEyeSlash } from "react-icons/fa";

interface Params {
    label: string;
    inputType: string;
    onChange: (value: string | ((prev: string) => string)) => void;
}

const LoginInput:FC<Params> = ({label, inputType, onChange }) => {

    const [showPassword, setShowPassword] = useState(false);

    const togglePassword = () => {
        setShowPassword(old => !old);
    }

  return (
    <label className="form-control mt-5">
        <span className="label-text py-1 px-1 text-black">{label}:</span>
        <input 
            type={showPassword ? "text" : inputType} 
            className="input input-bordered max-w-xs bg-white shadow-md text-slate-400" 
            onChange={(e) => {onChange(e.target.value)}}
        />

        <div className='relative left-[87%] -top-9'>
            { 
                inputType == "password" &&
                    (showPassword ? 
                        <IoIosEye className='w-7 h-7 cursor-pointer' onClick={togglePassword}/> : 
                        <FaEyeSlash className='w-7 h-7 cursor-pointer' onClick={togglePassword}/>)
            }
        </div>
    </label>
  )
}

export default LoginInput