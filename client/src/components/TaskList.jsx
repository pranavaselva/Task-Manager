import React, { useState } from 'react';
import TaskCard from './TaskCard';
import TaskForm from './TaskForm';
import { useTaskContext } from '../content/TaskContent';
import { Search } from 'lucide-react';

const TaskList = () => {
  const { tasks, updateTask } = useTaskContext();
  const [editingTask, setEditingTask] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleEditTask = (task) => {
    setEditingTask(task);
  };

  const handleUpdateTask = (data) => {
    if (editingTask) {
      updateTask(editingTask.id, data);
      setEditingTask(null);
    }
  };

  const filteredTasks = tasks.filter(task => 
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (task.description && task.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const activeTasks = filteredTasks.filter(task => !task.completed);
  const completedTasks = filteredTasks.filter(task => task.completed);

  return (
    <div className="animate-fade-in">
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <input 
          type="text" 
          placeholder="Search tasks..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input input-bordered pl-10 w-full"
        />
      </div>

      <h2 className="text-lg font-medium mb-3">Active Tasks ({activeTasks.length})</h2>
      <div className="space-y-2">
        {activeTasks.length > 0 ? (
          activeTasks.map((task) => (
            <div key={task.id} className="animate-slide-in">
              <TaskCard task={task} onEdit={handleEditTask} />
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center p-4">No active tasks</p>
        )}
      </div>
      
      {completedTasks.length > 0 && (
        <>
          <h2 className="text-lg font-medium mt-8 mb-3">Completed Tasks ({completedTasks.length})</h2>
          <div className="space-y-2">
            {completedTasks.map((task) => (
              <div key={task.id} className="animate-slide-in">
                <TaskCard task={task} onEdit={handleEditTask} />
              </div>
            ))}
          </div>
        </>
      )}
      
      {editingTask && (
        <dialog id="task_modal" className="modal modal-open">
          <div className="modal-box">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => setEditingTask(null)}>✕</button>
            </form>
            <h3 className="font-bold text-lg">Edit Task</h3>
            <TaskForm 
              onSubmit={handleUpdateTask} 
              defaultValues={editingTask}
              isEditing={true}
            />
          </div>
        </dialog>
      )}
    </div>
  );
};

export default TaskList;
