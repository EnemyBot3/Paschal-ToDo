export var userId = -1;
export var username: string | undefined;
export function setUserId (newId: number, newUsername?: string) {
  userId = newId;
  username = newUsername;
}

export var searchField: string | undefined;
export function setSearchField (value?: string) {
  searchField = value;
}

// Utility function to format date
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear().toString().slice(2);
  return `${day}/${month}/${year}`;
}
  
// Utility function to format completed status
export const formatCompleted = (completed: string): { value: string, color: string } => {
  switch (completed.toLowerCase()) {
    case "completed":
      return { value: "Completed", color: "text-green-500" };
    case "inprogress":
      return { value: "In Progress", color: "text-yellow-500" };
    case "incomplete":
      return { value: "Not Started", color: "text-red-500" };
    default:
      return { value: "Unknown", color: "text-gray-500" };
  }
}