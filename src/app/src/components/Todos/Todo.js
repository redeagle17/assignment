import React, { useState } from "react";
import "./Todo.css";

const todos = [
  {
    task: "sbjasdgg",
  },
  {
    task: "sdjbfksbgkbkf",
  },
  {
    task: "sdjbfksbgkbkf",
  },
];

function Todo() {
  const [task, setTask] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task) {
      console.log("Task");
      setTask("");
    }
  };
  return (
    <form onSubmit={handleSubmit} className="TodoForm">
      <div className="input_btn">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="todo-input"
          placeholder="Enter your Task"
        />
        <button type="submit" className="todo-btn">
          Add Task
        </button>
      </div>
      <div className="task-list">
        {todos.map((t, index) => (
          <div key={index} className="task-item">
            {t.task}
          </div>
        ))}
      </div>
    </form>
  );
}

export default Todo;
