import TaskItem from './TaskItem';

function TaskList({ tasks, onToggleComplete, onEditTask, onDeleteTask }) {
  if (tasks.length === 0) {
    return <p className='empty-state'>No tasks found.</p>
  }

  return (
    <ul className='task-list'>
      {tasks.map((task) => (
        <TaskItem 
          key={task.id} 
          task={task}
          onToggleComplete={onToggleComplete}
          onEditTask={onEditTask}
          onDeleteTask={onDeleteTask}
          />
      ))}
    </ul>
  )
}

export default TaskList;