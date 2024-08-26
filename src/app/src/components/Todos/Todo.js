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
    setError("");
    setTask([]);
    try {
      const response = await axios.get("http://localhost:8000/todos/");
      if (response.status === 200) {
        setTodos(response.data);
      }
    } catch (err) {
      setLoading(false);
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError("Something went wrong. Please try again later");
      }
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        description: task,
      };

      const response = await axios.post(
        "http://localhost:8000/todos/",
        payload
      );
      if (response.status === 201) {
        setError("");
        setTask("");
        fetchTodos();
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError("Something went wrong. Please try again later");
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
