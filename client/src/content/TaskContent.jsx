import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

const TaskContext = createContext();

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      try {
        return JSON.parse(savedTasks).map((task) => ({
          ...task,
          createdAt: new Date(task.createdAt),
          dueDate: task.dueDate ? new Date(task.dueDate) : undefined,
        }));
      } catch (e) {
        console.error('Error parsing tasks from localStorage', e);
        return initialTasks;
      }
    }
    return initialTasks;
  });

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (taskData) => {
    const newTask = {
      ...taskData,
      id: generateId(),
      createdAt: new Date(),
    };
    setTasks((prevTasks) => [newTask, ...prevTasks]);
    toast.success('Task created successfully');
  };

  const updateTask = (id, taskData) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, ...taskData } : task
      )
    );
    toast.success('Task updated successfully');
  };

  const deleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    toast.success('Task deleted successfully');
  };

  const toggleTaskCompletion = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <TaskContext.Provider
      value={{ tasks, addTask, updateTask, deleteTask, toggleTaskCompletion }}
    >
      {children}
    </TaskContext.Provider>
  );
};

const generateId = () => {
  return Math.random().toString(36).substring(2, 10);
};

const initialTasks = [
  {
    id: '1',
    title: 'Complete project proposal',
    description: 'Finish the project proposal and send it to the client',
    completed: false,
    createdAt: new Date(),
    priority: 'high',
    dueDate: new Date(new Date().setDate(new Date().getDate() + 3)),
  },
  {
    id: '2',
    title: 'Review code changes',
    description: 'Review the code changes and provide feedback',
    completed: false,
    createdAt: new Date(),
    priority: 'medium',
  },
  {
    id: '3',
    title: 'Weekly team meeting',
    description: 'Attend the weekly team meeting and discuss project progress',
    completed: true,
    createdAt: new Date(),
    priority: 'low',
    dueDate: new Date(new Date().setDate(new Date().getDate() - 1)),
  },
];
