import React from 'react';
import { useState } from 'react';
import './todo.css';

const Todo = () => {
  const categories = ["Urgent", "Work", "Personal"];
 
  const [urgentTasks, setUrgentTasks] = useState([]);
  const [workTasks, setWorkTasks] = useState([]);
  const [personalTasks, setPersonalTasks] = useState([]);
  const [task, setTask] = useState("");
  const [edit, setEdit] = useState("");
  const [category, setCategory] = useState("");

  function handleAdd() {
    if (task.length === 0) {
      alert("Please enter a task");
      return;
    }
if (category === "Urgent") {
      setUrgentTasks([...urgentTasks, task]);
    } else if (category === "Work") {
      setWorkTasks([...workTasks, task]);
    } else {
     setPersonalTasks([...personalTasks, task]);
    }

    setTask("");
    setCategory("");
  }

  function handleDelete(taskToDelete) {
    if (urgentTasks.includes(taskToDelete)) {
      setUrgentTasks(urgentTasks.filter(task => task !== taskToDelete));
    } else if (workTasks.includes(taskToDelete)) {
      setWorkTasks(workTasks.filter(task => task !== taskToDelete));
    } else if (personalTasks.includes(taskToDelete)) {
      setPersonalTasks(personalTasks.filter(task => task !== taskToDelete));
    }
  }

  function handleEdit(taskToEdit) {
    setTask(taskToEdit);
    setEdit(taskToEdit);

    if (urgentTasks.includes(taskToEdit)) {
      setCategory("Urgent");
    } else if (workTasks.includes(taskToEdit)) {
      setCategory("Work");
    } else {
      setCategory("Personal");
    }
  }

  function handleSave(taskToSave) {
    if (task.length === 0) {
      alert("Please enter a task");
      return;
    }

    handleDelete(edit);

    if (category === "Urgent") {
      setUrgentTasks([...urgentTasks, task]);
    } else if (category === "Work") {
      setWorkTasks([...workTasks, task]);
    } else {
      setPersonalTasks([...personalTasks, task]);
    }

    setEdit("");
    setTask("");
    setCategory("");
  }

  const onDragStart = (e, task, sourceCategory) => {
    e.dataTransfer.setData("task", task);
    e.dataTransfer.setData("sourceCategory", sourceCategory);
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const onDrop = (e, targetCategory) => {
    e.preventDefault();
    const task = e.dataTransfer.getData("task");
    const sourceCategory = e.dataTransfer.getData("sourceCategory");

    if (sourceCategory === targetCategory) return;
    if (sourceCategory === "Urgent") {
      setUrgentTasks(urgentTasks.filter(t => t !== task));
    } else if (sourceCategory === "Work") {
      setWorkTasks(workTasks.filter(t => t !== task));
    } else if (sourceCategory === "Personal") {
      setPersonalTasks(personalTasks.filter(t => t !== task));
    }
    if (targetCategory === "Urgent") {
      setUrgentTasks([...urgentTasks, task]);
    } else if (targetCategory === "Work") {
      setWorkTasks([...workTasks, task]);
    } else if (targetCategory === "Personal") {
      setPersonalTasks([...personalTasks, task]);
    }
  };

  return (
    <div className="todo-container">
    
      <div className="todo-input-container">
        <input
          type="text"
          placeholder="Enter your task"
          onChange={(e) => setTask(e.target.value)}
          className="task-input"
          value={task}
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="category-select"
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <button className="add-task-button" onClick={handleAdd}>
          Add task
        </button>
      </div>
      <div className="tasks-columns">
       <div
          className="task-column urgent-column"
          onDragOver={(e) => onDragOver(e)}
          onDrop={(e) => onDrop(e, "Urgent")}
        >
          <h3 className="column-title">Urgent</h3>
          <ul className="todo-list">
            {urgentTasks.map((item) => {
              if (edit === item) {
                return (
                  <li key={item} className="editing">
                    <input
                      type="text"
                      value={task}
                      onChange={(e) => setTask(e.target.value)}
                      className="edit-input"
                    />
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="category-select"
                    >
                      <option value="">Select Category</option>
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                    <button
                      className="save-button"
                      onClick={() => handleSave(item)}
                    >
                      Save
                    </button>
                  </li>
                );
              }
              return (
                <li
                  key={item}
                  className="todo-item urgent"
                  draggable="true"
                  onDragStart={(e) => onDragStart(e, item, "Urgent")}
                >
                  <div className="todo-content">
                    <span className="task-text">{item}</span>
                    <div className="button-group">
                      <button
                        className="delete-button"
                        onClick={() => handleDelete(item)}
                      >
                        Delete
                      </button>
                      <button
                        className="edit-button"
                        onClick={() => handleEdit(item)}
                      >
                        Edit
                      </button>
                    </div>
                    <div className="category-display">
                      <span className="category-label">Urgent</span>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        <div
          className="task-column work-column"
          onDragOver={(e) => onDragOver(e)}
          onDrop={(e) => onDrop(e, "Work")}
        >
          <h3 className="column-title">Work</h3>
          <ul className="todo-list">
            {workTasks.map((item) => {
              if (edit === item) {
                return (
                  <li key={item} className="editing">
                    <input
                      type="text"
                      value={task}
                      onChange={(e) => setTask(e.target.value)}
                      className="edit-input"
                    />
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="category-select"
                    >
                      <option value="">Select Category</option>
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                    <button
                      className="save-button"
                      onClick={() => handleSave(item)}
                    >
                      Save
                    </button>
                  </li>
                );
              }
              return (
                <li
                  key={item}
                  className="todo-item work"
                  draggable="true"
                  onDragStart={(e) => onDragStart(e, item, "Work")}
                >
                  <div className="todo-content">
                    <span className="task-text">{item}</span>
                    <div className="button-group">
                      <button
                        className="delete-button"
                        onClick={() => handleDelete(item)}
                      >
                        Delete
                      </button>
                      <button
                        className="edit-button"
                        onClick={() => handleEdit(item)}
                      >
                        Edit
                      </button>
                    </div>
                    <div className="category-display">
                      <span className="category-label">Work</span>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

       
        <div
          className="task-column personal-column"
          onDragOver={(e) => onDragOver(e)}
          onDrop={(e) => onDrop(e, "Personal")}
        >
          <h3 className="column-title">Personal</h3>
          <ul className="todo-list">
            {personalTasks.map((item) => {
              if (edit === item) {
                return (
                  <li key={item} className="editing">
                    <input
                      type="text"
                      value={task}
                      onChange={(e) => setTask(e.target.value)}
                      className="edit-input"
                    />
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="category-select"
                    >
                      <option value="">Select Category</option>
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                    <button
                      className="save-button"
                      onClick={() => handleSave(item)}
                    >
                      Save
                    </button>
                  </li>
                );
              }
              return (
                <li
                  key={item}
                  className="todo-item personal"
                  draggable="true"
                  onDragStart={(e) => onDragStart(e, item, "Personal")}
                >
                  <div className="todo-content">
                    <span className="task-text">{item}</span>
                    <div className="button-group">
                      <button
                        className="delete-button"
                        onClick={() => handleDelete(item)}
                      >
                        Delete
                      </button>
                      <button
                        className="edit-button"
                        onClick={() => handleEdit(item)}
                      >
                        Edit
                      </button>
                    </div>
                    <div className="category-display">
                      <span className="category-label">Personal</span>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Todo;
