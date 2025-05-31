/**
 * Represents a todo item in the application
 */
export interface Todo {
  /** Unique identifier for the todo */
  id: string;
  /** The content/description of the todo */
  text: string;
  /** Whether the todo has been completed */
  completed: boolean;
  /** When the todo was created */
  createdAt: Date;
}

/**
 * Represents the possible filter states for the todo list
 * - 'all': Show all todos
 * - 'active': Show only uncompleted todos
 * - 'completed': Show only completed todos
 */
export type TodoFilter = 'all' | 'active' | 'completed'; 