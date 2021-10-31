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

    const fetchTask = async (id) => {
    const response = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await response.json();

    return data;
  }

  const addTask = async (task) => {
    const response = await fetch(`http://localhost:5000/tasks`, {
      method: 'POST', 
      headers: { 'Content-type': 'application/json'}, 
      body: JSON.stringify(task)
    });
 
    const data = await response.json();
    
    setTasks([...tasks, data]);
    // const highestId = tasks.map(task => task.id).sort()[tasks.length - 1];
    // await fetch(`http://localhost:5000/tasks`, {method: 'POST', body: task});
    // setTasks([...tasks, {...task, id: highestId + 1}]);
  }

  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {method: 'DELETE'})
    setTasks(tasks.filter(task => task.id !== id));
  }

  const toggleReminder = async (id) => {
    const taskToChange = tasks.find(task =>
      task.id === id);
    
    taskToChange.reminder = !taskToChange.reminder;

    console.log(taskToChange);
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT', 
      headers: { 'Content-type': 'application/json'}, 
      body: JSON.stringify(taskToChange)
    });


    setTasks([...tasks]);
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
