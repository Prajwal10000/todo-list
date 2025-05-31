import React, { useState } from 'react';

const TaskForm = ({ onAddTask }) => {
  const [taskText, setTaskText] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    if (taskText.trim().length === 0) {
      setError('Task cannot be empty');
      return;
    }
    
    if (taskText.trim().length > 100) {
      setError('Task must be less than 100 characters');
      return;
    }

    const success = onAddTask(taskText);
    if (success) {
      setTaskText('');
      setError('');
    }
  };

  const handleInputChange = (e) => {
    setTaskText(e.target.value);
    if (error) setError(''); // Clear error when user starts typing
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="input-group">
        <input
          type="text"
          value={taskText}
          onChange={handleInputChange}
          placeholder="Add a new task..."
          className={`task-input ${error ? 'error' : ''}`}
          maxLength="100"
        />
        <button type="submit" className="add-button">
          Add Task
        </button>
      </div>
      {error && <div className="error-message">{error}</div>}
      <div className="character-count">
        {taskText.length}/100 characters
      </div>
    </form>
  );
};

export default TaskForm;
