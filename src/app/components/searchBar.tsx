import React, { FC, useState, useEffect } from 'react'
import { FaSearch } from "react-icons/fa";

// utils
import { searchField } from '../helpers/utils';

// interfaces
import { TodoDataInterface } from '../helpers/interfaces';
interface Params {
  data: TodoDataInterface[]
  setData: (value: TodoDataInterface[] | ((prev: TodoDataInterface[]) => TodoDataInterface[])) => void;
}

const SearchBar:FC<Params> = ({data, setData}) => {
  const [query, setQuery] = useState("");

  useEffect(() => {
    let sortedData: TodoDataInterface[] = data;

    if (searchField == "Title") {
      sortedData = data.filter(item => 
        item.title.toLowerCase().includes(query.toLocaleLowerCase())
      );
    }
    else if (searchField == "Items") {
      sortedData = data.filter(item => 
        item.items?.some(subItem => 
          subItem.value.toLowerCase().includes(query.toLocaleLowerCase())
        )
      );
    }

    setData(sortedData);

  }, [searchField, data, query])

  return (
    <label className="input input-bordered flex flex-grow items-center mt-5 mb-5 ml-3 m-2 bg-[#E0E7FF] shadow-md">
        <input 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          type="text"
          className="grow placeholder-black input-primary text-slate-400 font-bold w-40" 
          placeholder="Search" />
        <FaSearch className="text-black icons"/>
    </label>
  )
}


 export default SearchBar;