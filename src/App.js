import Header from './components/Header'
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import { useState, useEffect } from "react"


function App() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([])
  useEffect(() => {
    const getTasks = async() => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    }
    getTasks();
  }, [])

  const fetchTasks = async () => {
    const response = await fetch('http://localhost:5000/tasks');
    const data = await response.json();

    return data;
  }

  const addTask = (task) => {
    const highestId = tasks.map(task => task.id).sort()[tasks.length - 1];
    console.log('highestId', highestId);
    setTasks([...tasks, {...task, id: highestId + 1}]);
  }

  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {method: 'DELETE'})
    setTasks(tasks.filter(task => task.id !== id));
  }

  const toggleReminder = (id) => {

    setTasks(tasks.map(task =>
      task.id === id
        ? { ...task, reminder: !task.reminder }
        : task));
  }

  const toggleShowAddTask = () => {
    setShowAddTask(!showAddTask);
  }

  return (
    <div className="container">
      <Header title='Faz' showAddTask={showAddTask} onToggleShowAddTask={toggleShowAddTask} />
      {
        showAddTask && <AddTask onAdd={addTask} />
      }
      {
        tasks.length > 0
          ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
          : <p>No tasks present</p>
      }
    </div>

  );
}

export default App;
