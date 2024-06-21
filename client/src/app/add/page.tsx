'use client';

// npm packages
import React, { useState } from "react";
import { useRouter } from "next/navigation";

// tsx components
import TodoItem from "../components/todoItem";
import SaveButton from "../components/saveButton";
import CancelButton from "../components/cancelButton";
import Alerts from "../components/alerts";
import AddItemButton from "../components/addItemButton";

// api functions
import { createTodo } from "../api/post";

// interfaces
import { TodoItemInterface } from "@/app/helpers/interfaces";

// utils
import { userId } from "../helpers/utils";

export default function AddTodoPage() {
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [items, setItems] = useState<TodoItemInterface[]>([]);
  const [displayAlert, setDisplayAlert] = useState<string | null>(null);

  async function handleAddTodo() {
    if (title && items.length > 0) {
      await createTodo(title, items, userId)
      router.replace("/");
    } else {
      setDisplayAlert(
        !title.trim() ? 
          'Please provide a title for the list' : 
          'Please add at least one item'
      );
      setTimeout(() => setDisplayAlert(null), 3000);
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#E0E7FF]">
      <h1 className="prevent-select text-3xl font-bold text-center cursor-pointer text-black mb-10">
        Create Todo List
      </h1>

      <div className="bg-slate-50 w-[285px] sm:w-[50%] md:w-[60%] lg:w-[70%] xl:w-[60%] 2xl:w-[50%] h-[568px] lg:h-[80vh] rounded-lg flex flex-col items-center">
        <label className="prevent-select input input-bordered flex items-center gap-2 my-5 mx-3 bg-[#E0E7FF] text-black font-bold w-[96%] shadow-md">
          Title:
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            className="grow text-slate-400" 
          />
        </label>

        <ul className="prevent-select custom-scroll rounded-box text-black -mt-2 overflow-y-auto h-3/4 w-full flex flex-col items-center overflow-x-hidden">
          {items.map((item, index) => (
            <TodoItem 
              value={item.value} 
              key={item.value + index} 
              checked={item.checked} 
              setItems={setItems} 
              index={index}
            />
          ))}
          <AddItemButton addItems={setItems} />
        </ul>

        <div className="mt-auto mb-2 mx-2.5 w-[95%] flex justify-center align-middle">
          <CancelButton />
          <SaveButton onClick={handleAddTodo} />
        </div>
      </div>

      {
        displayAlert && 
        <Alerts message={displayAlert} type='warning' />
      }
    </main>
  );
}
