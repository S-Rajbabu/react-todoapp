import React, { useState } from 'react';

// AddTodo component
const AddTodo = ({ addTodo }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() === '' || description.trim() === '') {
      setError('Title and Description cannot be empty');
      return;
    }
    addTodo({
      id: Date.now(),
      title,
      description,
      completed: false
    });
    setTitle('');
    setDescription('');
    setError('');
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="input-field"
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="input-field"
      />
      <button type="submit" className="btn add-btn">Add Todo</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default AddTodo;
