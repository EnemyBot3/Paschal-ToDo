'use client';

import React, { FC } from 'react';
import { CgAddR } from "react-icons/cg";


interface Params {
  visible: (value: boolean | ((prev: boolean) => boolean)) => void;
} 

const AddButton:FC<Params> = ({ visible }) => {   
  return (
    <div className="flex justify-center items-center w-full max-w-[900px] relative p-1 pt-0">
      <li 
        onClick={() => visible(old => !old)} 
        className="btn m-1.5 mt-5 w-[80%] p-2 rounded-lg border-none flex justify-center items-center bg-green-500 hover:bg-green-600 text-lg font-bold text-black shadow-md"
      >
        <CgAddR className="w-[30px] h-[30px] text-black"/> ADD ITEM
      </li>  
    </div>

  );
};

export default AddButton;