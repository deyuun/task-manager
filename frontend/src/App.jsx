import { useEffect } from 'react';
import { useState } from 'react';
import { addTask, editTask, fetchTasks, removeTask } from './api/tasks';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import SearchFilterBar from './components/SearchFilterBar';
import "./App.css"

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("")

  useEffect(() => {
    async function loadTasks() {
      try {
        setLoading(true);
        const data = await fetchTasks(search, filter);
        setTasks(data);
        setError("");
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }

    }

    loadTasks();
  }, [search, filter]);
  

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
      setTasks((prevTasks) => prevTasks.map((task) => ( task.id === id ? updated : task)))
    } catch (error) {
      setError(error.message)
    }
    
  }
  
  async function handleEditTask(id, updates) {
    try {
      const updated = await editTask(id, updates);
      setTasks((prevTasks) => prevTasks.map((task) => (task.id === id ? updated : task)));
    } catch (error) {
      setError(error.message);
    }
  }

  async function handleDeleteTask(id) {
    try {
      await removeTask(id);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    } catch (error) {
      setError(error.message);
    }
  }
  
  return (
    <div className="app-container">
      <h1>Task Manager</h1>

      <TaskForm onSubmitTask={handleAddTask}/>

      <SearchFilterBar 
        search={search}
        onSearchChange={setSearch}
        filter={filter}
        onFilterChange={setFilter}  
      />
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