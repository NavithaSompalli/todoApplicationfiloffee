import React, { useState, useContext, useEffect } from "react";
import { TodoContext } from "../../context/TodoContext";

const TodoForm = ({ editTodo, setEditing }) => {
  const { addTodo, updateTodo } = useContext(TodoContext);

  const [form, setForm] = useState({
    id: null,
    title: "",
    description: "",
    dueDate: "",
    status: "Pending",
  });

  useEffect(() => {
    if (editTodo) {
      setForm(editTodo); // Populate form with the task to be edited
    } else {
      setForm({ id: null, title: "", description: "", dueDate: "", status: "Pending" }); // Reset form
    }
  }, [editTodo]); // Reset or populate form whenever `editTodo` changes

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editTodo) {
      updateTodo(form.id, form); // Update the task
      setEditing(false); // Exit editing mode
    } else {
      addTodo({ ...form, id: Date.now() }); // Add a new task
    }
    // Reset the form
    setForm({ id: null, title: "", description: "", dueDate: "", status: "Pending" });
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input
        type="text"
        name="title"
        placeholder="Task Title"
        value={form.title}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="description"
        placeholder="Task Description"
        value={form.description}
        onChange={handleChange}
        required
      />
      <input
        type="date"
        name="dueDate"
        value={form.dueDate}
        onChange={handleChange}
        required
      />
      <select name="status" value={form.status} onChange={handleChange}>
        <option value="Pending">Pending</option>
        <option value="Completed">Completed</option>
      </select>
      <button type="submit">{editTodo ? "Update" : "Add"} Task</button>
    </form>
  );
};

export default TodoForm;
