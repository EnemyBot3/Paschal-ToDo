'use client'

// npm packages
import React, { FC, MouseEvent } from 'react';
import { useRouter } from "next/navigation";

// tsx coomponents
import DeleteButton from './deleteButton';

// utility functions
import {formatDate, formatCompleted} from "@/app/helpers/utils"

// api functions
import { deleteTodoById } from '../api/delete';

// interfaces
import { TodoDataInterface, TodoItemInterface } from "@/app/helpers/interfaces";
interface Params extends TodoDataInterface {
  index: number;
  setData: (value: TodoDataInterface[] | ((prev: TodoDataInterface[]) => TodoDataInterface[])) => void;
}

const TodoList:FC<Params> = ({ id, title, completed, date, index, setData }) => {
  const router = useRouter();

  const formattedCompleted = formatCompleted(completed);
  const formattedDate = formatDate(date);

  const SeeTodo = () => {
    router.push(`/item/${id}`)
  }

  async function onDelete(e: MouseEvent<SVGElement>) {
    e.stopPropagation();
    await deleteTodoById(id);
    setData(old => old.filter((_, idx) => idx !== index));
    router.refresh();
  }

  return (
    <li onClick={SeeTodo} className="hover:bg-slate-200 m-1.5 p-1.5 lg:pl-5 rounded-lg border-2 cursor-pointer">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-lg font-bold">{title}</h1>
          <label className={formattedCompleted.color}>{formattedCompleted.value}</label>
          <small className="text-[10px] italic">{` - ${formattedDate}`}</small>
        </div>  
        <div>
          <DeleteButton onclick={onDelete}/>
        </div>  
      </div>
    </li>
  )
}

export default TodoList;
