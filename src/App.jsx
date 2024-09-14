// Import necessary modules and hooks from React and React Router
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import TodoList from './components/Todo/TodoList';
import AddTodo from './components/Todo/AddTodo';
import EditTodo from './components/Todo/EditTodo';
import { saveTodos, loadTodos } from './utils/localStorage';
import './styles/App.css'; 
import './styles/Auth.css'; 

const App = () => {
  const [todos, setTodos] = useState(loadTodos());
  const [editingTodo, setEditingTodo] = useState(null);

  // Effect to save todos to localStorage whenever the todos state changes
  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

   // Function to add a new todo to the todos list
  const addTodo = (todo) => {
    setTodos([...todos, todo]);
  };

  // Function to update an existing todo in the todos list
  const updateTodo = (updatedTodo) => {
    setTodos(todos.map(todo => (todo.id === updatedTodo.id ? updatedTodo : todo)));
    setEditingTodo(null);
  };

  // Function to delete a todo by its ID
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // Function to toggle the completion status of a todo
  const toggleComplete = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  // Function to set a todo for editing
  const editTodo = (todo) => {
    setEditingTodo(todo);
  };

  return (
    <AuthProvider>
      <Router>
        <div className="container">
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/todos" element={
              <div>
                <h1>Todo List</h1>

                {editingTodo ? (
                  <EditTodo todo={editingTodo} updateTodo={updateTodo} />
                ) : (
                  <AddTodo addTodo={addTodo} />
                )}
                <TodoList todos={todos} toggleComplete={toggleComplete} deleteTodo={deleteTodo} editTodo={editTodo} />
              </div>
            } />
            <Route path="/edit/:id" element={<EditTodo updateTodo={updateTodo} />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
