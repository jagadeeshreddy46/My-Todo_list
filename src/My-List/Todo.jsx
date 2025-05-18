import React, { useState, useEffect } from 'react';
import './List.css';

function Todo({ onLogout }) {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTask, setEditedTask] = useState('');

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(savedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = () => {
    if (task.trim()) {
      setIsLoading(true);
      const newTask = {
        id: Date.now(),
        text: task,
        colorClass: getRandomColorClass(),
        completed: false
      };
      setTimeout(() => {
        setTasks(prevTasks => [...prevTasks, newTask]);
        setTask('');
        setIsLoading(false);
      }, 500);
    }
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleEdit = (id, currentText) => {
    setEditingTaskId(id);
    setEditedTask(currentText);
  };

  const handleSaveEdit = () => {
    setTasks(tasks.map(task =>
      task.id === editingTaskId ? { ...task, text: editedTask } : task
    ));
    setEditingTaskId(null);
    setEditedTask('');
  };

  const handleComplete = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const getRandomColorClass = () => {
    const colors = ['task-blue', 'task-orange', 'task-purple', 'task-pink'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div className="todo-container">
      <h1>What's the Plan for Today?</h1>
      <div className="task-form">
        <input
          type="text"
          placeholder="Add a task...."
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button onClick={handleAddTask} className="add-btn">+ Add Task</button>
      </div>
      <ul className="task-list">
        {tasks.map((t) => (
          <li key={t.id} className={`task-item ${t.colorClass} ${t.completed ? 'completed' : ''}`}>
            {editingTaskId === t.id ? (
              <>
                <input id="tex"
                  type="text"
                  value={editedTask}
                  onChange={(e) => setEditedTask(e.target.value)}
                />
                <button onClick={handleSaveEdit} className="save-btn">Save</button>
              </>
            ) : (
              <>
                <span>{t.text}</span>
                <button onClick={() => handleComplete(t.id)} className="complete-btn">✔</button>
                <button onClick={() => handleEdit(t.id, t.text)} className="edit-btn">✎</button>
                <button onClick={() => handleDelete(t.id)} className="delete-btn">✖</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todo;