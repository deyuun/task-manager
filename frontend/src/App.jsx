import { useEffect } from 'react';
import { useState } from 'react';
import { fetchTasks } from './api/tasks';
import TaskList from './components/TaskList';

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

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadTasks();
  }, []);

  
  return (
    <div className="app-container">
      <h1>Task Manager</h1>

      {error && <p className='error-text'>{error}</p>}

      {loading ? <p>Loading tasks...</p> : <TaskList tasks={tasks} />}
    </div>
  );
}

export default App;