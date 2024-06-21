export interface TodoItem {
    value: string;
    checked: boolean;
}

export interface TodoData {
    id: number;
    title: string;
    completed: string;
    date: string;
    items: TodoItem[];
}
