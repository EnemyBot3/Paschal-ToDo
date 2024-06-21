'use client';

import React, { FC, use, useEffect, useState } from 'react'
import { IoMdOptions } from "react-icons/io";
import { IoClose } from "react-icons/io5";

// utils
import { setSearchField } from '../helpers/utils';

// interfaces
import { TodoDataInterface } from '../helpers/interfaces';
interface Params {
  data: TodoDataInterface[]
  setData: (value: TodoDataInterface[] | ((prev: TodoDataInterface[]) => TodoDataInterface[])) => void;
}

const FilterButton:FC<Params> = ( {data, setData} ) => {
  const [showFilter, setShowFilter] = useState(false);
  const [sortBy, setSortBy] = useState("Title");
  const [searchBy, setSearchBy] = useState("Title");

  useEffect(() => {
    let sortedData: TodoDataInterface[] = data;

    if (sortBy == "Title") {
      sortedData = data.slice().sort((a, b) => a.title.localeCompare(b.title));
    }
    else if (sortBy == "Date") {
      sortedData = data.slice().sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    }
    else if (sortBy == "Completed") {
      sortedData = data.slice().sort((a, b) => {
        if (a.completed === b.completed) return 0;
        return a.completed === "completed" ? -1 : 1;
      });
    }

    setSearchField(searchBy);
    setData(sortedData);

  }, [searchBy, sortBy, data])


  return (
    <div className="indicator w-2/12 max-w-[80px] min-w-[55px]">
      <details 
        className="dropdown dropdown-end w-full" 
        onClick={() => setShowFilter(old => !old)}
      >
        <summary className="btn flex-grow btn-primary bg-[#E0E7FF] border-none p-0 hover:bg-slate-400 iconbtn w-[87%]">
          { 
            showFilter ? 
              <IoClose className="w-2/4 h-3/4 icon"/> :
              <IoMdOptions className="w-2/4 h-3/4 icon"/>
          }
        </summary>
        <ul
          onClick={(e) => e.stopPropagation()}
          className="p-2 menu dropdown-content z-[1] bg-[#E0E7FF] text-black rounded-lg rounded-tr-none w-52 mr-3 mt-2 shadow-md"
        >
          <li className="prevent-select menu-title text-white -mb-2">Sort By:</li>
          <li onClick={() => setSortBy("Completed")} className={"hover:bg-[#c7d3ff] rounded-lg " + (sortBy == "Completed" && "text-purple-500 font-bold")}><a>Completed</a></li>
          <li onClick={() => setSortBy("Title")} className={"hover:bg-[#c7d3ff] rounded-lg " + (sortBy == "Title" && "text-purple-500 font-bold")}><a>Title</a></li>
          <li onClick={() => setSortBy("Date")} className={"hover:bg-[#c7d3ff] rounded-lg " + (sortBy == "Date" && "text-purple-500 font-bold")}><a>Date</a></li>

          <li className="prevent-select menu-title text-white -mb-2">Search By:</li>
          <li onClick={() => setSearchBy("Title")} className={"hover:bg-[#c7d3ff] rounded-lg " + (searchBy == "Title" && "text-purple-500 font-bold")}><a>Title</a></li>
          <li onClick={() => setSearchBy("Items")} className={"hover:bg-[#c7d3ff] rounded-lg " + (searchBy == "Items" && "text-purple-500 font-bold")}><a>Items</a></li>
        </ul>
      </details>
    </div>
  )
}

export default FilterButton;