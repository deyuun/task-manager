const BASE_URL = "http://localhost:5000/api/tasks";

async function handleResponse(response) {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }
  return data;
}

export async function fetchTasks(search, filter) {
  const params = new URLSearchParams();
  if (search !== "" && search !== undefined) {
    params.append("search", search);
  }
  if (filter !== "" && filter !== undefined && filter !== "all") {
    params.append("filter", filter);
  }

  const response = await fetch(`${BASE_URL}?${params.toString()}`);
  return handleResponse(response)
}

export async function addTask(task) {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json"},
    body: JSON.stringify(task),
  })

  return handleResponse(response);
}

export async function editTask(id, updates) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json"},
    body: JSON.stringify(updates),
  })
  return handleResponse(response)
}

export async function removeTask(id) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  })
  return handleResponse(response);
}