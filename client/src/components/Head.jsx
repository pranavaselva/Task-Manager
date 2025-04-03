import React from 'react';
import { useTaskContext } from '../content/TaskContent';

const Head = () => {
  const { tasks } = useTaskContext();
  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;
  const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="mb-8 animate-fade-in">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-2">
        Task Dashboard
      </h1>
      <p className="text-gray-500 mb-4">
        Organize your tasks and boost productivity
      </p>
      
      <div className="flex items-center mt-4">
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-primary h-2.5 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>
        <span className="ml-4 text-sm font-medium text-gray-700">
          {completedTasks}/{totalTasks} ({completionPercentage}%)
        </span>
      </div>
    </div>
  );
};

export default Head;
