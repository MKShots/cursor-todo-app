/**
 * TodoItem Component
 * 
 * A reusable component that renders an individual todo item.
 * Features:
 * - Toggle completion status with a checkbox
 * - Delete todo with a trash icon
 * - Visual feedback for completed items
 * - Hover effects for better UX
 * 
 * @component
 */

import { Todo } from '@/app/types/todo';
import { FaTrash, FaCheck } from 'react-icons/fa';

interface TodoItemProps {
  /** The todo item to display */
  todo: Todo;
  /** Callback function to toggle todo completion status */
  onToggle: (id: string) => void;
  /** Callback function to delete the todo */
  onDelete: (id: string) => void;
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 mb-3">
      {/* Todo completion toggle and text */}
      <div className="flex items-center space-x-4">
        <button
          onClick={() => onToggle(todo.id)}
          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors duration-200 ${
            todo.completed
              ? 'bg-green-500 border-green-500'
              : 'border-gray-300 hover:border-green-500'
          }`}
          aria-label={todo.completed ? "Mark as incomplete" : "Mark as complete"}
        >
          {/* Show checkmark icon when completed */}
          {todo.completed && <FaCheck className="text-white text-sm" />}
        </button>
        <span
          className={`text-lg transition-all duration-200 ${
            todo.completed ? 'text-gray-400 line-through' : 'text-gray-800'
          }`}
        >
          {todo.text}
        </span>
      </div>

      {/* Delete button */}
      <button
        onClick={() => onDelete(todo.id)}
        className="text-gray-400 hover:text-red-500 transition-colors duration-200"
        aria-label="Delete todo"
      >
        <FaTrash />
      </button>
    </div>
  );
} 