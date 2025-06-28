import { useEffect, useState } from "react";
import { getTodos, addTodo } from "./api";

interface TodoItem {
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

  return (
    <div style={{ padding: "2rem" }}>
      <h1>📝 Мій список справ</h1>
      <input
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
        placeholder="Нова справа..."
      />
      <button onClick={handleAdd}>Додати</button>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.title} {todo.isCompleted ? "✅" : "❌"}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
