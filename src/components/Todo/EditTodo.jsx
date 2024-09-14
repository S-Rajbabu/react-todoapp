import React, { useState, useEffect } from 'react';

// EditTodo component
const EditTodo = ({ todo, updateTodo }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (todo) {
      setTitle(todo.title);
      setDescription(todo.description);
    }
  }, [todo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateTodo({
      ...todo,
      title,
      description
    });
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="input-field"
        required
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="input-field"
        required
      />
      <button type="submit" className="btn update-btn">Update Todo</button>
    </form>
  );
};

export default EditTodo;
