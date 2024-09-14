// src/utils/localStorage.js

// Function to save the todos array to localStorage
export const saveTodos = (todos) => {
  localStorage.setItem('todos', JSON.stringify(todos));
};

// Function to load the todos array from localStorage
export const loadTodos = () => {
  const todos = localStorage.getItem('todos');
  return todos ? JSON.parse(todos) : [];
};
