import { FaTimes } from 'react-icons/fa';
import dateFormat from 'dateformat';

const Task = ({ task, onDelete }) => {
    
    return (
        <div className='task'>
            <h3>{task.text} <FaTimes style={{color: 'red', cursor: 'pointer'}} onClick={() => onDelete(task.id)}/></h3>
            <p>{dateFormat(task.date, 'dddd, mmmm dS, yyyy')}</p>
            <p>{dateFormat(task.date, 'HH:MM')}</p>
        </div>
    )
}

export default Task
