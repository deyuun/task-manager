import { useEffect } from 'react';
import { useState } from 'react';
import { addTask, editTask, fetchTasks, removeTask } from './api/tasks';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import "./App.css"

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadTasks() {
    try {
      setLoading(true);
      const data = await fetchTasks();
      setTasks(data);
      setError("");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleAddTask(newTask) {
    try {
      const created = await addTask(newTask);
      setTasks((prev) => [created, ...prev]);
    } catch (error) {
      setError(error.message);
    }
  }

  async function handleToggleComplete(id, completed) {
    try {
      const updated = await editTask(id, { completed });
      setTasks((prevTask) => prevTask.map((task) => ( task.id === id ? updated : task)))
    } catch (error) {
      setError(error.message)
    }
    
  }
  
  async function handleEditTask(id, updates) {
    try {
      const updated = await editTask(id, updates);
      setTasks((prevTask) => prevTask.map((task) => (task.id === id ? updated : task)));
    } catch (error) {
      setError(error.message);
    }
  }

  async function handleDeleteTask(id) {
    try {
      await removeTask(id);
      setTasks((prevTask) => prevTask.filter((task) => task.id !== id));
    } catch (error) {
      setError(error.message);
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadTasks();
  }, []);

  
  return (
    <div className="app-container">
      <h1>Task Manager</h1>

      <TaskForm onSubmitTask={handleAddTask}/>
      {error && <p className='error-text'>{error}</p>}

      {loading ? (
          <p>Loading tasks...</p> 
        ) : (
          <TaskList 
            tasks={tasks}
            onToggleComplete={handleToggleComplete}
            onEditTask={handleEditTask}
            onDeleteTask={handleDeleteTask} 
          />)}
    </div>
  );
}

export default App;