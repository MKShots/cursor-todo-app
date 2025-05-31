/**
 * Main Todo Application Component
 * 
 * This is the primary component of the Todo application that handles:
 * - Todo item management (add, toggle, delete)
 * - Filtering functionality
 * - Local storage persistence
 * - Client-side hydration
 * 
 * The component uses React hooks for state management and implements
 * optimistic updates for better user experience.
 */

'use client';

import { useState, useEffect } from 'react';
import { Todo, TodoFilter } from './types/todo';
import { TodoList } from './components/TodoList';
import { v4 as uuidv4 } from 'uuid';

// Interface for todos stored in localStorage to handle Date serialization
interface SavedTodo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: string;
}

export default function Home() {
  // State for handling client-side hydration
  const [isClient, setIsClient] = useState(false);
  
  // Core application state
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState<TodoFilter>('all');

  // Handle client-side hydration to prevent hydration mismatch
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Load todos from localStorage on initial render
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      try {
        const parsedTodos = JSON.parse(savedTodos);
        // Convert stored date strings back to Date objects
        setTodos(parsedTodos.map((todo: SavedTodo) => ({
          ...todo,
          createdAt: new Date(todo.createdAt)
        })));
      } catch (error) {
        console.error('Error loading todos:', error);
        setTodos([]);
      }
    }
  }, []);

  // Persist todos to localStorage whenever they change
  useEffect(() => {
    if (isClient) {
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }, [todos, isClient]);

  /**
   * Adds a new todo to the list
   * - Prevents empty todos
   * - Trims whitespace
   * - Adds new todo at the beginning of the list
   * - Generates unique ID using UUID
   */
  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim()) {
      setTodos([
        {
          id: uuidv4(),
          text: newTodo.trim(),
          completed: false,
          createdAt: new Date(),
        },
        ...todos,
      ]);
      setNewTodo('');
    }
  };

  /**
   * Toggles the completed status of a todo
   * Implements optimistic updates for better UX
   */
  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  /**
   * Removes a todo from the list
   * Implements optimistic updates for better UX
   */
  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
          Cursor Todo App
        </h1>

        {/* Todo Input Form */}
        <form onSubmit={addTodo} className="mb-8">
          <div className="flex gap-3">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="What needs to be done?"
              className="todo-input"
            />
            <button
              type="submit"
              className="todo-button bg-blue-500 hover:bg-blue-600"
            >
              Add Todo
            </button>
          </div>
        </form>

        {/* Filter Buttons */}
        <div className="flex justify-center gap-4 mb-8">
          {(['all', 'active', 'completed'] as const).map((filterOption) => (
            <button
              key={filterOption}
              onClick={() => setFilter(filterOption)}
              className={`todo-button ${
                filter === filterOption
                  ? 'bg-blue-500'
                  : 'bg-gray-500 hover:bg-gray-600'
              }`}
            >
              {filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
            </button>
          ))}
        </div>

        {/* Todo List Component */}
        <TodoList
          todos={todos}
          filter={filter}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
        />
      </div>
    </main>
  );
}
