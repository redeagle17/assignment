import React, { useState, useEffect } from "react";
import "./Todo.css";
import axios from "axios";

function Todo() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchTodos = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8000/todos/");
      setTodos(response.data);
    } catch (err) {
      setError("Failed to fetch TODOs. Please try again later.");
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (task) {
      try {
        const payload = {
          description: task,
        };
        await axios.post("http://localhost:8000/todos/", payload);
        setTask("");
        fetchTodos();
      } catch (err) {
        setError("Failed to add TODO. Please try again.");
      }
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="TodoApp">
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

        {error && <div className="error">{error}</div>}
        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          <div className="task-list">
            {todos.map((t, index) => (
              <div key={index} className="task-item">
                {t.description}
              </div>
            ))}
          </div>
        )}
      </form>
    </div>
  );
}

export default Todo;
