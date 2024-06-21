'use client';

// npm packages
import React, { useState, useEffect, FC } from "react";
import { useRouter } from "next/navigation";

// tsx components
import TodoItem from "@/app/components/todoItem";
import SaveButton from "@/app/components/saveButton";
import CancelButton from "@/app/components/cancelButton";
import Alerts from "@/app/components/alerts";

// api functions
import { getTodoById } from "@/app/api/get";

// interfaces
import { TodoDataInterface, TodoItemInterface } from "@/app/helpers/interfaces";
import AddItemButton from "@/app/components/addItemButton";
import { updateTodoById } from "@/app/api/patch";
interface Props { params: { itemId: number }; }


const ListTodoPage: FC<Props> = ({ params }) => {
  const router = useRouter();

  const [data, setData] = useState<TodoDataInterface | null>();
  const [items, setItems] = useState<TodoItemInterface[]>([]);
  const [displayAlert, setDisplayAlert] = useState(false);

  useEffect(() => {
    async function fetchTodo() {
      try {
        const response = await getTodoById(params.itemId);

        if (response && response.todo) {
          const { id, title, completed, date, items } = response.todo;
          setData({ id, title, completed, date, items });
          setItems(response.todo.items)
        } else {
          setDisplayAlert(true);
          setTimeout(() => setDisplayAlert(false), 4000);
          console.log('first', response)
        }
      } catch (error) {
        console.log('2', error)
        setDisplayAlert(true);
        setTimeout(() => setDisplayAlert(false), 4000);
      }
    }

    fetchTodo();
  }, [params.itemId]);

  async function updateItems() {
    await updateTodoById(params.itemId, items);
    router.replace("/");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#E0E7FF]">

      <h1 className="prevent-select text-3xl font-bold text-center cursor-pointer text-black mb-10">
        {data?.title}
      </h1>

      <div className="bg-slate-50 w-[285px] sm:w-[50%] md:w-[60%] lg:w-[70%] xl:w-[60%] 2xl:w-[50%] h-[568px] lg:h-[80vh] rounded-lg flex flex-col items-center">

        <ul className="prevent-select custom-scroll rounded-box text-black overflow-y-auto h-3/4 w-full flex flex-col items-center overflow-x-hidden">
          {
            items?.map((item, index) => 
              <TodoItem 
                key={item.value + index} 
                checked={item.checked} 
                index={index} 
                setItems={setItems} 
                value={item.value}/>
            )
          }
          
          <AddItemButton addItems={setItems} />
        </ul>

        <div className="mt-auto mb-2 mx-2.5 w-[95%] flex justify-center align-middle">
          <CancelButton />
          <SaveButton onClick={updateItems} />
        </div>

      </div>

      {
        displayAlert && 
        <Alerts message="Failed to connect to database" type="error" />
      }

    </main>
  );
}

export default ListTodoPage;
