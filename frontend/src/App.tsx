import { useEffect, useState } from "react";
import { getTodos, addTodo, toggleTodo, deleteTodo } from "./api";

export interface TodoItem {
  id: number;
  title: string;
  isCompleted: boolean;
}

function App() {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [newTitle, setNewTitle] = useState("");

  const loadTodos = async () => {
    try {
      const data = await getTodos();
      setTodos(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAdd = async () => {
    if (!newTitle.trim()) return;
    try {
      await addTodo(newTitle);
      setNewTitle("");
      loadTodos();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const handleToggle = async (todo: TodoItem) => {
    try {
      await toggleTodo(todo);
      loadTodos();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteTodo(id);
      loadTodos();
    } catch (err) {
      console.error(err)
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1 className="text-3xl font-bold underline">📝 Мій список справ</h1>
      <input
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
        placeholder="Нова справа..."
      />
      <button onClick={handleAdd}>Додати</button>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id} style={{ cursor: "pointer", margin: "0.5rem" }}>
            <span onClick={() => handleToggle(todo)}>
              {todo.title} {todo.isCompleted ? "✅" : "❌"}
            </span>
            <button
              onClick={() => handleDelete(todo.id)}
              style={{
                marginLeft: "1rem",
                background: "red",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer"
              }}
            >
              🗑
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
