import React from 'react';
import '../../styles/App.css'; 

// TodoList component
const TodoList = ({ todos, toggleComplete, deleteTodo, editTodo }) => {
  return (
    <div className="todo-list">
      <hr/> 
      <h3>
        <center>List of Tasks</center>
      </h3>
      <ul className="todo-list">
        {todos.map(todo => (
          <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
            <div className="todo-content">
              <div className="todo-label">
                <strong>Title :</strong>
                <span>{todo.title}</span>
              </div>
              <div className="todo-label">
                <strong>Description :</strong>
                <span>{todo.description}</span>
              </div>
              <div className="todo-label">
                <strong>Status :</strong>
                <span className={`todo-status ${todo.completed ? 'completed' : 'incomplete'}`}>
                  {todo.completed ? 'Completed' : 'Incomplete'}
                </span>
              </div>
            </div>
            <div className="todo-actions">
              <button onClick={() => toggleComplete(todo.id)} className="btn complete-btn">
                {todo.completed ? 'Mark It Incomplete' : 'Mark It Complete'}
              </button>
              <button onClick={() => deleteTodo(todo.id)} className="btn delete-btn">Delete</button>
              <button onClick={() => editTodo(todo)} className="btn edit-btn">Edit</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
