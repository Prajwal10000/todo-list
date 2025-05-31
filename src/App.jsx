
import React, { useState, useEffect } from 'react';
import TaskForm from './components/Taskform.jsx';
import TaskList from './components/TaskList';
import TaskFilter from './components/TaskFilter';
import './App.css';

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  // Save to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (taskText) => {
    if (taskText.trim() === '') return false;
    
    const newTask = {
      id: Date.now(),
      text: taskText.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
      priority: 'medium'
    };
    
    setTasks(prevTasks => [...prevTasks, newTask]);
    return true;
  };

  const removeTask = (taskId) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
  };

  const toggleComplete = (taskId) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const updateTaskPriority = (taskId, priority) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, priority } : task
      )
    );
  };

  // Filter tasks based on completion status
  const getFilteredTasks = () => {
    let filtered = tasks;
    
    switch (filter) {
      case 'active':
        filtered = tasks.filter(task => !task.completed);
        break;
      case 'completed':
        filtered = tasks.filter(task => task.completed);
        break;
      default:
        filtered = tasks;
    }

    // Sort tasks
    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'priority':
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        case 'alphabetical':
          return a.text.localeCompare(b.text);
        case 'date':
        default:
          return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });
  };

  const filteredTasks = getFilteredTasks();
  const completedCount = tasks.filter(task => task.completed).length;
  const totalCount = tasks.length;

  return (
    <div className="app">
      <header className="app-header">
        <h1>React To-Do List</h1>
        <div className="task-stats">
          {completedCount} of {totalCount} tasks completed
        </div>
      </header>

      <main className="app-main">
        <TaskForm onAddTask={addTask} />
        
        <TaskFilter
          filter={filter}
          sortBy={sortBy}
          onFilterChange={setFilter}
          onSortChange={setSortBy}
          taskCount={filteredTasks.length}
        />

        <TaskList
          tasks={filteredTasks}
          onRemoveTask={removeTask}
          onToggleComplete={toggleComplete}
          onUpdatePriority={updateTaskPriority}
        />
      </main>
    </div>
  );
}

export default App;
