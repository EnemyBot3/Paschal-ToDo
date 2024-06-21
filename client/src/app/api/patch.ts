import axios from 'axios';

// interfaces
import { TodoItemInterface } from "@/app/helpers/interfaces";


// patch todo items by Id
export async function updateTodoById(todoId: number, items: TodoItemInterface[]) {
    try {
        const response = await axios.patch(
            process.env.NEXT_PUBLIC_SERVER_ADDRESS + `/updateTodoItemsById/${todoId}`, 
            { items }
        );
        return response.data;
        
    } catch (error) { return error;}
}
