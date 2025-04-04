import React from 'react';
import { useTaskContext } from '../content/TaskContent';
import { Edit, Trash2, Calendar } from 'lucide-react';
import { format } from 'date-fns';

const TaskCard = ({ task, onEdit }) => {
  const { toggleTaskCompletion, deleteTask } = useTaskContext();

  return (
    <div className={`bg-white rounded-lg shadow-sm p-4 mb-4 border-l-4 ${
      task.priority === 'high' ? 'border-red-500' :
      task.priority === 'medium' ? 'border-yellow-500' :
      task.priority === 'low' ? 'border-green-500' : ''
    } ${task.completed ? 'opacity-70' : ''}`}>
      
      <div className="flex items-start gap-3">
        <input 
          type="checkbox" 
          checked={task.completed} 
          onChange={() => toggleTaskCompletion(task.id)} 
          className="checkbox checkbox-primary"
        />
        <div className="flex-grow">
          <h3 className={`font-medium mb-1 text-lg ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
            {task.title}
          </h3>
          <p className={`text-gray-600 text-sm ${task.completed ? 'line-through text-gray-400' : ''}`}>
            {task.description}
          </p>
          {task.dueDate && (
            <div className="flex items-center mt-3 text-xs text-gray-500">
              <Calendar size={14} className="mr-1" />
              <span>Due: {format(new Date(task.dueDate), 'MMM d, yyyy')}</span>
            </div>
          )}
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => {
              console.log("Editing Task:", task);  
              onEdit(task);
          }}
            className="btn btn-ghost btn-sm text-gray-500 hover:text-primary hover:bg-primary/10"
          >
            <Edit size={16} />
          </button>
          <button 
            onClick={() => deleteTask(task.id)}
            className="btn btn-ghost btn-sm text-gray-500 hover:text-red-500 hover:bg-red-100"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;