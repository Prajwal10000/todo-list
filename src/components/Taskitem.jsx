import React from 'react';

const TaskItem = ({ task, onRemove, onToggleComplete, onUpdatePriority }) => {
  const handlePriorityChange = (e) => {
    onUpdatePriority(task.id, e.target.value);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''} priority-${task.priority}`}>
      <div className="task-content">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggleComplete(task.id)}
          className="task-checkbox"
        />
        <span className="task-text">{task.text}</span>
      </div>
      
      <div className="task-meta">
        <select
          value={task.priority}
          onChange={handlePriorityChange}
          className="priority-select"
          disabled={task.completed}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        
        <span className="task-date">{formatDate(task.createdAt)}</span>
        
        <button
          onClick={() => onRemove(task.id)}
          className="remove-button"
          aria-label="Remove task"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
