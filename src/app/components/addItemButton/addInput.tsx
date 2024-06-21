'use client';

// npm packages
import React, { useState, FC } from 'react';
import { IoIosAdd } from "react-icons/io";

// tsx components
import Alerts from '../alerts';

// interfaces
import { TodoItemInterface } from "@/app/helpers/interfaces";

interface Params {
  onComplete: (value: boolean | ((prev: boolean) => boolean)) => void;
  addItems: (value: TodoItemInterface[] | ((prev: TodoItemInterface[]) => TodoItemInterface[])) => void;
} 

const AddInput:FC<Params> = ({ onComplete, addItems }) => {   
  const [value, setValue] = useState('');
  const [displayAlert, setDisplayAlert] = useState(false);

  const AddTodoItem = () => {
    if (value) {
      addItems(old => [...old, { value, checked: false }]);
      onComplete(old => !old)
    } else {
      setDisplayAlert(true);
      setTimeout(() => setDisplayAlert(false), 3000);
    }
  }

  return (
    <>
      <label className="flex justify-center items-center w-[90%] max-w-[600px] relative p-1 mt-3 cursor-pointer border-slate-300">
        <input 
          type="text" 
          placeholder="Type here" 
          value={value} 
          onChange={(e) => setValue(e.target.value)} 
          className="input input-bordered bg-transparent border-slate-600 w-60 mr-3 flex flex-grow" 
        />
        <button 
          onClick={AddTodoItem} 
          className="btn rounded-lg items-center justify-center p-0 bg-green-500 hover:bg-green-300 border-none text-black w-2/12 max-w-[80px] min-w-[55px]"
        >
          <IoIosAdd className="w-4/5 h-4/5"/>
        </button>
      </label>
      {
        displayAlert &&
        <Alerts message='Cannot Add empty Item' type='warning'/>
      }
    </>
  );
};

export default AddInput;