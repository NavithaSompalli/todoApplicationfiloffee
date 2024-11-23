import React, { useState } from "react";
import { TodoProvider } from "./context/TodoContext";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import "./App.css";

const App = () => {
  const [editing, setEditing] = useState(false);
  const [editTodo, setEditTodo] = useState(null);

  return (
    <TodoProvider>
      <div className="app-container">
        <h1>Todo Application</h1>
        <TodoForm editTodo={editTodo} setEditing={setEditing} />
        <TodoList setEditing={setEditing} setEditTodo={setEditTodo} />
      </div>
    </TodoProvider>
  );
};

export default App;
