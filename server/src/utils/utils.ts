import { TodoItem } from './interfaces';

export const determineComplete = (items: TodoItem[]) => {
    let completed = 'Unknown';

    if (items.every((item: TodoItem) => item.checked)) {
        completed = 'completed';
    } else if (items.some((item: TodoItem) => item.checked)) {
        completed = 'inprogress';
    } else {
        completed = 'incomplete';
    }

    return completed;
};
