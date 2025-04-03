import React from 'react';
import Head from '../components/Head';
import TaskList from '../components/TaskList';
import CreateTaskButton from '../components/CreateTaskButton';
import { TaskProvider } from '../content/TaskContent';

const Home = () => {
  return (
    <TaskProvider>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex justify-between items-start mb-8">
            <Head />
            <div className="mt-2">
              <CreateTaskButton />
            </div>
          </div>
          <TaskList />
        </div>
      </div>
    </TaskProvider>
  );
};

export default Home;
