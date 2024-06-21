import React, { FC, MouseEvent } from 'react';
import { MdDelete } from "react-icons/md";

interface Params {
  onclick: (e: MouseEvent<SVGElement>) => void;
}

const DeleteButton: FC<Params> = ({ onclick }) => {

  return (
    <MdDelete 
      onClick={onclick} 
      className='inline-flex flex-row w-[25px] h-[25px] mr-2 lg:mr-5 hover:text-red-500' 
    />
  );
};

export default DeleteButton;
