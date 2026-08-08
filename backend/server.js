const express = require("express");
const cors = require("cors");
require("dotenv").config();

const taskRouter = require("./routes/tasks");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/tasks", taskRouter);

app.get("/", (req, res) => {
  res.json({message: "Task Manager API is running"})
});

app.use((error, req, res, next) => {
  console.error(error.stack);
  res.status(500).json({
    message: "Unexpected server error"
  });
})
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})