function TaskItem({task}) {
  return (
    <li>
      <input type='checkbox' checked={task.completed} readOnly/>
      <div className='task-info'>
        <p className='task-title'>{task.title}</p>
        {task.description && <p className='task-description'>{task.description}</p>}
      </div>
    </li>
  )
}

export default TaskItem;