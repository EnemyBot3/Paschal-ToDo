import axios from 'axios';

// delete todo by Id
export async function deleteTodoById(id: number) {
    try {
        const response = await axios.delete(
            process.env.NEXT_PUBLIC_SERVER_ADDRESS + `/deleteTodo/${id}`
        );
        return response.data;
    } 
    catch (error) { return error }
}