import { FaTimes } from 'react-icons/fa';
import { FaBell } from 'react-icons/fa';
import dateFormat from 'dateformat';

const Task = ({ task, onDelete, onToggle }) => {
    
    return (
        <div className={`task ${task.reminder ? 'reminder' : ''}`} onDoubleClick={() => onToggle(task.id)}>
            <h3>{task.text} <FaTimes style={{color: 'red', cursor: 'pointer'}} onClick={() => onDelete(task.id)}/></h3>
            <p>{dateFormat(task.date, 'dddd, mmmm dS, yyyy')}</p>
            <p>{dateFormat(task.date, 'HH:MM')}</p>
        </div>
    )
}

export default Task
