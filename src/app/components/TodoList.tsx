import { Todo, TodoFilter } from '@/app/types/todo';
import { TodoItem } from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  filter: TodoFilter;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TodoList({ todos, filter, onToggle, onDelete }: TodoListProps) {
  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  return (
    <div className="space-y-2">
      {filteredTodos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
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