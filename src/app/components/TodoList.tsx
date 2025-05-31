/**
 * TodoList Component
 * 
 * A reusable component that renders a filtered list of todos.
 * It handles:
 * - Filtering todos based on their completion status
 * - Rendering individual TodoItem components
 * - Displaying appropriate empty state messages
 * 
 * @component
 */

import { Todo, TodoFilter } from '@/app/types/todo';
import { TodoItem } from './TodoItem';

interface TodoListProps {
  /** Array of todo items to display */
  todos: Todo[];
  /** Current filter state (all/active/completed) */
  filter: TodoFilter;
  /** Callback function to toggle todo completion status */
  onToggle: (id: string) => void;
  /** Callback function to delete a todo */
  onDelete: (id: string) => void;
}

export function TodoList({ todos, filter, onToggle, onDelete }: TodoListProps) {
  // Filter todos based on the current filter state
  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true; // 'all' filter
  });

  return (
    <div className="space-y-2">
      {/* Render filtered todo items */}
      {filteredTodos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}

      {/* Display appropriate empty state message */}
      {filteredTodos.length === 0 && (
        <p className="text-center text-gray-500 py-4">
          {filter === 'all'
            ? 'No todos yet! Add one above.'
            : filter === 'active'
            ? 'No active todos.'
            : 'No completed todos.'}
        </p>
      )}
    </div>
  );
} 