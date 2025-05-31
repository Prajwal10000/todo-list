import React from 'react';

const TaskFilter = ({ filter, sortBy, onFilterChange, onSortChange, taskCount }) => {
  return (
    <div className="task-filter">
      <div className="filter-group">
        <label>Filter:</label>
        <select value={filter} onChange={(e) => onFilterChange(e.target.value)}>
          <option value="all">All Tasks</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <div className="sort-group">
        <label>Sort by:</label>
        <select value={sortBy} onChange={(e) => onSortChange(e.target.value)}>
          <option value="date">Date Created</option>
          <option value="priority">Priority</option>
          <option value="alphabetical">Alphabetical</option>
        </select>
      </div>

      <div className="task-count">
        {taskCount} task{taskCount !== 1 ? 's' : ''}
      </div>
    </div>
  );
};

export default TaskFilter;
