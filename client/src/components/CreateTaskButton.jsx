import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import TaskForm from './TaskForm';
import { useTaskContext } from '../content/TaskContent';

const CreateTaskButton = () => {
  const { addTask, updateTask } = useTaskContext();
  const [editingTask, setEditingTask] = useState(null);

  const handleCreateOrUpdateTask = (data) => {
    if (editingTask) {
      // If editing, update task
      updateTask(data);
    } else {
      // If creating, add new task
      addTask({
        title: data.title,
        description: data.description || '',
        priority: data.priority,
        dueDate: data.dueDate,
        completed: false,
      });
    }

    setEditingTask(null); // Clear editing state
    document.getElementById('task_modal').close();
  };

  return (
    <>
      <button 
        className="btn flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg shadow-lg hover:bg-primary/90"
        onClick={() => {
          setEditingTask(null);
          document.getElementById('task_modal').showModal();
        }}
      >
        <Plus size={20} />
        <span>Add New Task</span>
      </button>

      <dialog id="task_modal" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <h3 className="font-bold text-lg">{editingTask ? "Edit Task" : "Create New Task"}</h3>
          <TaskForm onSubmit={handleCreateOrUpdateTask} defaultValues={editingTask || { title: "", description: "", priority: "medium", dueDate: undefined }} isEditing={!!editingTask} />
        </div>
      </dialog>
    </>
  );
};

export default CreateTaskButton;
