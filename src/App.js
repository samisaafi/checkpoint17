import React, { useState } from 'react';

// Task component
const Task = ({ id, description, isDone, onEditTask }) => {
  const handleEditClick = () => {
    const newDescription = prompt('Enter the new task description:');
    if (newDescription) {
      onEditTask(id, newDescription);
    }
  };

  return (
    <div>
      <h3>{description}</h3>
      <p>Status: {isDone ? 'Done' : 'Not done'}</p>
      <button onClick={handleEditClick}>Edit</button>
    </div>
  );
};

// AddTask component
const AddTask = ({ onAddTask }) => {
  const [description, setDescription] = useState('');

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (description) {
      onAddTask(description);
      setDescription('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={description}
        onChange={handleDescriptionChange}
        placeholder="Enter task description"
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

// ListTask component
const ListTask = ({ tasks, filter }) => {
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'done') {
      return task.isDone;
    } else if (filter === 'notDone') {
      return !task.isDone;
    } else {
      return true; // show all tasks if no filter is applied
    }
  });

  return (
    <div>
      {filteredTasks.map((task) => (
        <Task key={task.id} {...task} />
      ))}
    </div>
  );
};

// App component
const App = () => {
  const [tasks, setTasks] = useState([]);

  const handleAddTask = (description) => {
    const newTask = {
      id: tasks.length + 1,
      description,
      isDone: false,
    };
    setTasks([...tasks, newTask]);
  };

  const handleEditTask = (id, newDescription) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, description: newDescription };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  return (
    <div>
      <h2>Todo List</h2>
      <AddTask onAddTask={handleAddTask} />
      <h3>All Tasks</h3>
      <ListTask tasks={tasks} filter="all" />
      <h3>Done Tasks</h3>
      <ListTask tasks={tasks} filter="done" />
      <h3>Not Done Tasks</h3>
      <ListTask tasks={tasks} filter="notDone" />
    </div>
  );
};

export default App;
