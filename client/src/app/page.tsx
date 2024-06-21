"use client";
// npm packages
import React, { useEffect, useState } from "react";

// tsx components 
import SearchBar from "./components/searchBar";
import FilterButton from "./components/filterButton";
import TodoList from "./components/todoList";
import AddTodoButton from "./components/addButton";
import Alerts from "./components/alerts";
import LoginButton from "./components/loginButton";

// api functions
import { getAllTodos, getAllUserTodos } from './api/get';

// interfaces
import { TodoDataInterface } from "@/app/helpers/interfaces";

// helpers
import { userId } from "./helpers/utils";

export default function Home() {
  const [todos, setTodos] = useState<TodoDataInterface[]>([]); // changed
  const [filteredTodos, setFilteredTodos] = useState<TodoDataInterface[]>([]); // changed
  const [displayAlert, setDisplayAlert] = useState(false);

  useEffect(() => {
    async function fetchTodos() {
      const response = await getAllUserTodos(userId);

      if (response?.todos) {
        setTodos(response.todos);
      } else {
        setDisplayAlert(true);
        setTimeout(() => setDisplayAlert(false), 4000);
      }
    }

    fetchTodos();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#E0E7FF]">
      <h1 className="prevent-select text-3xl font-bold text-center cursor-pointer text-black mb-10">
        Todo List
      </h1>

      <div className="bg-slate-50 w-[285px] sm:w-[50%] md:w-[60%] lg:w-[70%] xl:w-[60%] 2xl:w-[50%] h-[568px] lg:h-[80vh] rounded-lg flex flex-col items-center">
        <div className="flex items-center w-full">
          <SearchBar 
            data={todos} 
            setData={setFilteredTodos}
          />
          <FilterButton 
            data={todos} 
            setData={setFilteredTodos}
          />
        </div>

        <ul className="prevent-select custom-scroll rounded-box text-black -mt-2 overflow-y-auto h-3/4 w-full">
          {filteredTodos.map((todo: TodoDataInterface, index) => (
            <TodoList
              key={todo.id}
              id={todo.id}
              title={todo.title}
              completed={todo.completed}
              date={todo.date}
              index={index}
              setData={setTodos}
            />
          ))}
        </ul>

        <AddTodoButton />
      </div>

      <LoginButton />
      {
        displayAlert && 
        <Alerts message="Failed to connect to database" type="error" />
      }

    </main>
  );
}
