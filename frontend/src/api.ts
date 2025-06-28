const API_BASE = "http://localhost:5140/api/todo";

export async function getTodos() {
  const res = await fetch(API_BASE);
  if (!res.ok)
    throw new Error("Не вдалось завантажити список задач");

  return res.json();
}

export async function addTodo(title: string) {
  const res = await fetch(API_BASE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      title, isCompleted: false
    })
  });

  if (!res.ok)
    throw new Error("Не вдалося додати задачу");
}
