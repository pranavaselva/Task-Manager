import React from 'react';
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';

const TaskForm = ({ onSubmit, defaultValues = { title: '', description: '', priority: 'medium', dueDate: undefined }, isEditing = false }) => {
  const { register, handleSubmit, setValue, watch } = useForm({ defaultValues });
  const dueDate = watch('dueDate');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 animate-fade-in">
      <div>
        <label className="block text-sm font-medium">Task Title</label>
        <input {...register('title', { required: true })} placeholder="Enter task title" className="input input-bordered w-full" />
      </div>

      <div>
        <label className="block text-sm font-medium">Description</label>
        <textarea {...register('description')} placeholder="Enter task details" className="textarea textarea-bordered w-full resize-none" rows={3}></textarea>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium">Priority</label>
          <select {...register('priority')} className="select select-bordered w-full">
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Due Date</label>
          <input 
            type="date" 
            className="input input-bordered w-full" 
            onChange={(e) => setValue('dueDate', e.target.value)}
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button type="submit" className="btn btn-primary">
          {isEditing ? 'Update Task' : 'Create Task'}
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
