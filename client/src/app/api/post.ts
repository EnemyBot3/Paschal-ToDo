import axios from 'axios';

// interfaces
import { TodoItemInterface } from "@/app/helpers/interfaces";


// add todo to the database
export async function createTodo(title: string, items: TodoItemInterface[], author_id: number) {
    try {
        const response = await axios.post(
            process.env.NEXT_PUBLIC_SERVER_ADDRESS + `/createTodo`, 
            { title, items, author_id }
        );
        return response.data;
        
    } catch (error) { return error;}
}

// log in
export async function userLogin(username: string, password: string) {
    try {
        const response = await axios.post(
            process.env.NEXT_PUBLIC_SERVER_ADDRESS + `/login`, 
            { username, password }
        );
        return response.data;
        
    } catch (error: any) { return error?.response.data;}
}

// register
export async function userRegister(username: string, password: string) {
    try {
        const response = await axios.post(
            process.env.NEXT_PUBLIC_SERVER_ADDRESS + `/register`, 
            { username, password }
        );
        return response.data;
        
    } catch (error: any) { return error?.response.data;}
}