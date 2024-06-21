import React, { FC, MouseEvent } from 'react';
import './css/todoItem.css'
import DeleteButton from './deleteButton';

// interfaces
import { TodoItemInterface } from "@/app/helpers/interfaces";

interface Params {
  value: string;
  checked: boolean;
  index: number;
  setItems: (value: TodoItemInterface[] | ((prev: TodoItemInterface[]) => TodoItemInterface[])) => void;
}

const TodoItem:FC<Params> = ({value, checked, index, setItems}) => { 
  
  const toggleCheck = () => {
    setItems(old => 
      old.map((item, idx) => 
        (idx === index ? 
          { ...item, checked: !checked } :
           item
    )));
  };

  const onDelete = (e: MouseEvent<SVGElement>) => { 
    e.stopPropagation();
    setItems(old => old.filter((_, idx) => idx !== index));
  };
  
  return(   
    <div className='flex items-center w-full pr-0 md:pr-3 hover:bg-slate-100'>
      <SvgDefs /> {/* import SVG definitions */}

      <label className="inline-block relative p-5 md:pl-20 pl-11 w-[90%] sm:w-full cursor-pointer border-b-[1px] border-slate-300">
        <input className="todo__state" type="checkbox" defaultChecked={checked} onChange={toggleCheck}/>
        
        {/* refrence definitions to create elements */}
        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 200 25" className="todo__icon md:left-[35px] left-[0px]">
          <use xlinkHref="#todo__box" className="todo__box"></use>
          <use xlinkHref="#todo__check" className="todo__check"></use>
          <use xlinkHref="#todo__circle" className="todo__circle"></use>
        </svg>

        <label className="fancy-link">{value}</label>

      </label>
      <DeleteButton onclick={onDelete}/>

    </div>
  );
}

// defines SVG elements needed for animation
const SvgDefs = () => (
  <svg viewBox="0 0 0 0" style={{ position: 'absolute', zIndex: -1, opacity: 0 }}>
    <defs>

      {/* SVGs color */}
      <linearGradient id="boxGradient" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="25" y2="25">
        <stop offset="30%" stopColor="#a5b4fc" />
        <stop offset="100%" stopColor="#5b21b6" />
      </linearGradient>

      {/* SVGs path */}
      <path id="todo__box" stroke="url(#boxGradient)" d="M21 12.7v5c0 1.3-1 2.3-2.3 2.3H8.3C7 20 6 19 6 17.7V7.3C6 6 7 5 8.3 5h10.4C20 5 21 6 21 7.3v5.4"></path>
      <path id="todo__check" stroke="url(#boxGradient)" d="M10 13l2 2 5-5"></path>
      <circle id="todo__circle" cx="13.5" cy="12.5" r="10"></circle>

    </defs>
  </svg>
);

export default TodoItem;