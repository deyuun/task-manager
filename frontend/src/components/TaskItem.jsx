import { useState } from 'react';

function TaskItem({task, onToggleComplete, onEditTask, onDeleteTask}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description || "");

  function handleSave() {
    if (!editTitle.trim()) return;
    onEditTask(task.id, {title: editTitle, description: editDescription});
    setIsEditing(false);
  }

  function handleCancel() {
    setEditTitle(task.title);
    setEditDescription(task.description || "");
    setIsEditing(false);
  }

  if (isEditing) {
    return (
      <li className='task-item editing'>
        <input
          type='text'
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
        />
        <input 
          type='text'
          value={editDescription}
          onChange={(e) => setEditDescription(e.target.value)}
        />  
        <div className='task-actions'>
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      </li>
    )
  }
  return (
    <li className={task.completed ? "task-item completed" : "task-item"}>
      <input type='checkbox' checked={task.completed} onChange={() => onToggleComplete(task.id, !task.completed)}
      />
      
      <div className='task-info'>
        <p className='task-title'>{task.title}</p>
        {task.description && <p className='task-description'>{task.description}</p>}
      </div>

      <div className='task-actions'>
        <button onClick={() => setIsEditing(true)}>Edit</button>
        <button onClick={() => onDeleteTask(task.id)}>Delete</button>
      </div>
    </li>
  )
}

export default TaskItem;