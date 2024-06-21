
export interface TodoItemInterface {
    value: string;
    checked: boolean;
}

export interface TodoDataInterface {
    id: number;
    title: string;
    completed: string;
    date: string;
    items?: TodoItemInterface[];
}