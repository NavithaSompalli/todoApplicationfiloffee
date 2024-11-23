import React, { useContext, useState } from "react";
import { TodoContext } from "../../context/TodoContext";
import './index.css'

const TodoList = ({ setEditing, setEditTodo }) => {
  const { todos, deleteTodo } = useContext(TodoContext);
  const [filter, setFilter] = useState({
    sortBy: "dueDate", // Default sort by due date
    order: "asc", // Default order is ascending
    statusFilter: "all", // Default is showing all statuses
  });

  const handleEdit = (todo) => {
    setEditing(true);
    setEditTodo(todo);
  };

  const filteredTodos = [...todos]
    // Filter by status
    .filter((todo) =>
      filter.statusFilter === "all" ? true : todo.status === filter.statusFilter
    )
    // Sort by due date
    .sort((a, b) => {
      if (filter.sortBy === "dueDate") {
        return filter.order === "asc"
          ? new Date(a.dueDate) - new Date(b.dueDate)
          : new Date(b.dueDate) - new Date(a.dueDate);
      }
      return 0;
    });

  return (
    <div>
      <div className="filters">
        {/* Filter by Status */}
        <select
          value={filter.statusFilter}
          onChange={(e) =>
            setFilter({ ...filter, statusFilter: e.target.value })
          }
          className="filter-status"
        >
          <option value="all">All</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>

        {/* Sort By */}
        <select
          value={filter.sortBy}
          onChange={(e) => setFilter({ ...filter, sortBy: e.target.value })}
          className="filter-sort"
        >
          <option value="dueDate">Due Date</option>
        </select>

        {/* Toggle Order */}
        <button
          onClick={() =>
            setFilter((prev) => ({
              ...prev,
              order: prev.order === "asc" ? "desc" : "asc",
            }))
          }
        >
          Toggle Order ({filter.order === "asc" ? "Ascending" : "Descending"})
        </button>
      </div>

      <ul className="todo-list">
        {filteredTodos.map((todo) => (
          <li key={todo.id}>
            <div>
              <strong>{todo.title}</strong>
              <p>{todo.description}</p>
              <p>Due: {todo.dueDate}</p>
              <p>Status: {todo.status}</p>
            </div>
            <button onClick={() => handleEdit(todo)}>Edit</button>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
