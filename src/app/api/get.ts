

// gets all todos
export async function getAllTodos() {
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_SERVER_ADDRESS + "/getAllTodos");
        const data = await response.json();
        return data;
    } 
    catch (error) { return error }
}

// gets todo by Id
export async function getTodoById(id: number) {
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_SERVER_ADDRESS + `/getTodoById/${id}`);
        const data = await response.json();
        return data;
    } 
    catch (error) { return error }
}

// gets only users todos
export async function getAllUserTodos(id: number) {
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_SERVER_ADDRESS + `/getAllUserTodos/${id}`);
        const data = await response.json();
        return data;
    } 
    catch (error) { return error }
}