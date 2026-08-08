import { useState } from 'react';

function TaskForm({onAddTask}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    onAddTask({title, description});

    setTitle("");
    setDescription("");
    setError("");
  }

  return (
    <form className='task-form' onSubmit={handleSubmit}>
      <div className='form-row'>
        <input 
          type='text'
          placeholder='Task title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input 
          type='text'
          placeholder='Description (optional)'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type='submit'>Add Task</button>
      </div>
      {error && <p className='error-text'>{error}</p>}
    </form>
  )
}

export default TaskForm;