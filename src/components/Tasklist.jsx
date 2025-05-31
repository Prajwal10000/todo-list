import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, onRemoveTask, onToggleComplete, onUpdatePriority }) => {
  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <p>No tasks found. Add a task to get started!</p>
      </div>
    );
  }

  return (
    <div className="task-list">
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onRemove={onRemoveTask}
          onToggleComplete={onToggleComplete}
          onUpdatePriority={onUpdatePriority}
        />
      ))}
    </div>
  );
};

export default TaskList;
