import React, { useState, useEffect } from 'react';
import './List.css';

function Todo({ onLogout }) {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null); // Track which task is being edited
  const [editedTask, setEditedTask] = useState(''); // For holding the new task text during editing

  // Load tasks from localStorage when component mounts
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(savedTasks); // Load tasks only once on initial load
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem('tasks', JSON.stringify(tasks)); // Update localStorage whenever tasks change
    }
  }, [tasks]);

  // Handle adding a new task
  const handleAddTask = () => {
    if (task.trim()) {
      setIsLoading(true);  // Show the spinner while adding task

      const newTask = {
        id: Date.now(),
        text: task,
        colorClass: getRandomColorClass(),
      };

      setTimeout(() => {
        setTasks(prevTasks => [...prevTasks, newTask]);
        setTask(''); // Clear the input field
        setIsLoading(false); // Hide the spinner
      }, 500); // Simulate loading time
    }
  };

  // Handle deleting a task
  const handleDelete = (id) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks); // Update tasks state after deletion
  };

  // Handle editing a task
  const handleEdit = (id, currentText) => {
    setEditingTaskId(id);  // Set the task ID being edited
    setEditedTask(currentText);  // Pre-fill the task's current text in the input field
  };

  // Save edited task
  const handleSaveEdit = () => {
    if (editedTask.trim()) {
      setTasks(prevTasks =>
        prevTasks.map(task =>
          task.id === editingTaskId ? { ...task, text: editedTask } : task
        )
      );
      setEditingTaskId(null);  // Reset editing mode
      setEditedTask(''); // Clear the edited task input
    }
  };

  // Generate random color class for the task item
  const getRandomColorClass = () => {
    const colors = ['task-blue', 'task-orange', 'task-purple', 'task-pink'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div className="todo-container">
      <div className="todo-header">
        <h1>My Tasks</h1>
      </div>

      {/* Task Input and Add Button */}
      <div className="task-form">
        <input
          type="text"
          placeholder="Enter a task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button onClick={handleAddTask} disabled={isLoading}>
          {isLoading ? (
            <div className="spinner"></div>
          ) : (
            <><i className="fas fa-plus"></i> Add Task</>
          )}
        </button>
      </div>

      {/* List of tasks */}
      <ul className="task-list">
        {tasks.length === 0 ? (
          <li>No tasks added yet</li>
        ) : (
          tasks.map((t) => (
            <li key={t.id} className={`task-item ${t.colorClass}`}>
              {editingTaskId === t.id ? (
                // Show the input field for editing the task
                <div className="edit-task-form">
                  <input
                    type="text"
                    value={editedTask}
                    onChange={(e) => setEditedTask(e.target.value)}
                  />
                  <button className="save-edit-btn" onClick={handleSaveEdit}>
                     Save Task
                  </button>
                </div>
              ) : (
                <>
                  <span>{t.text}</span>
                  <button className="edit-btn" onClick={() => handleEdit(t.id, t.text)}>
                    <i className="fas fa-edit"></i>
                  </button>
                  <button className="delete-btn" onClick={() => handleDelete(t.id)}>
                    <i className="fas fa-trash-alt"></i>
                  </button>
                </>
              )}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default Todo;
