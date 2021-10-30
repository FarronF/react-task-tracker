import { useState } from "react"


const Tasks = () => {
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
    return (
        <>
            {tasks.map(task => (<h3 key={task.id}>{task.text}</h3>))}
        </>
    )
}

export default Tasks
