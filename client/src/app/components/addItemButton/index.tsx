'use client';

import React, {FC, useState} from 'react'
import AddButton from './addButton';
import AddInput from './addInput';

// interfaces
import { TodoItemInterface } from "@/app/helpers/interfaces";
interface Params {
    addItems: (value: TodoItemInterface[] | ((prev: TodoItemInterface[]) => TodoItemInterface[])) => void;
} 

const AddItemButton:FC<Params> = ({addItems}) => {
    const [addingTodo, setAddingTodo] = useState(false);

    return (
        addingTodo ? 
            <AddInput onComplete={setAddingTodo} addItems={addItems}/> : 
            <AddButton visible={setAddingTodo}/>
    )
}

export default AddItemButton;