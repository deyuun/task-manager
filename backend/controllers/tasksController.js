const pool = require('../db.js');

// GET /api/tasks
async function getTasks(req, res) {
  try {
    const { search, filter } = req.query;

    let query = "SELECT * FROM tasks WHERE 1=1 ";
    const values = [];

    if (search) {
      values.push(`%${search}%`);
      query += `AND title ILIKE $${values.length}`;
    }

    if (filter === "active" || filter === "inactive") {
      query += " AND completed = false";
    } else if (filter === "completed") {
      query += " AND completed = true";
    }

    query += " ORDER BY created_at DESC";

    const result = await pool.query(query, values);
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ message: "Something went wrong fetching tasks" });
  }
}

// POST /api/tasks
async function createTask(req, res) {
  try {
    const {title, description} = req.body;

    if (!title || title.trim() === "") {
      return res.status(400).json({message: "Title is required"});
    }

    const result = await pool.query(
      "INSERT INTO tasks (title, description) VALUES ($1, $2) RETURNING *",
      [title.trim(), description || ""]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ message: "Something went wrong creating task"});
  }
}

// PUT /api/tasks/:id
async function updateTask(req, res) {
  try {
    const { id } = req.params;
    const { title, description, completed } = req.body;

    const existing = await pool.query("SELECT * FROM tasks WHERE id = $1", [id]);

    if (existing.rows.length === 0) {
      return res.status(404).json({
        message: "Task not found"
      })
    }

    if (title !== undefined && title.trim() === "") {
      return res.status(400).json({
        message: "Title cannot be empty"
      })
    }

    const current = existing.rows[0];

    const updated = await pool.query(
      `UPDATE tasks SET title = $1, description = $2, completed = $3, updated_at = NOW() WHERE id = $4 RETURNING *`,
      [
        title !== undefined ? title.trim() : current.title,
        description !== undefined ? description : current.description,
        completed !== undefined ? completed : current.completed,
        id,
      ]
    );

    res.json(updated.rows[0]);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({
      message: "Something went wrong updating the task"
    })
  }
} 

// DELETE /api/tasks/:id
async function deleteTask(req, res) {
  try {
    const { id } = req.params;
    const result = await pool.query("DELETE FROM tasks WHERE id = $1 RETURNING *", [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Task not found"
      })
    }

    res.json({
      message: "Task deleted", task: result.rows[0]
    })
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({
      message: "Something went wrong deleting the task"
    })
  }
}

module.exports = { getTasks, createTask, updateTask, deleteTask}

