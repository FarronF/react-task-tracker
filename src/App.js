import Header from './components/Header'
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import { useState } from "react"


function App() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([
    {
      id: 1,
      text: 'Mandarin class',
      date: new Date(2021, 10, 31, 12, 30, 0, 0),
      reminder: true,
    },
    {
      id: 2,
      text: 'D&D session',
      date: new Date(2021, 10, 31, 17, 30, 0, 0),
      reminder: true,
    },
    {
      id: 3,
      text: 'Food shopping',
      date: new Date(2021, 11, 1, 13, 30, 0, 0),
      reminder: false,
    }

  ])

  const addTask = (task) => {
    const highestId = tasks.map(task => task.id).sort()[tasks.length - 1];
    console.log('highestId', highestId);
    setTasks([...tasks, {...task, id: highestId + 1}]);
  }

  const deleteTask = (id) => {
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
