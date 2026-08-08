const BASE_URL = "http://localhost:5000/api/tasks";

async function handleResponse(response) {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }
  return data;
}

export async function fetchTasks() {
  const response = await fetch(BASE_URL);
  return handleResponse(response)
}