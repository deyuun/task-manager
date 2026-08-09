# Task Manager

A simple fullstack task manager. You can add tasks, mark them done, edit them, delete them, and search/filter through them.

Built for a take-home assessment using React (Vite) on the frontend, Express on the backend, and PostgreSQL for the database.

## What it does

- Add a new task (title + optional description)
- Check a box to mark it done (uncheck to mark it not done again)
- Edit a task's title/description
- Delete a task
- Search tasks by title
- Filter by All / Active / Inactive / Completed - search and filters work together, so you can search *and* filter at the same time

**Quick note on the filters:** a task only has one status in this app, done or not done (`completed: true/false`). The assignment asked for 4 filter buttons (All, Active, Inactive, Completed), but there's no real difference between "Active" and "Inactive" in the data, both just mean "not done yet." I didn't want to invent a fake third status that doesn't actually exist, so both buttons currently show the same thing. It's a small inconsistency in the original spec, documented here and in a comment in the code.

## Stack

- **Frontend:** React + Vite
- **Backend:** Express (Node.js)
- **Database:** PostgreSQL, using the `pg` package directly, no ORM, just plain SQL queries so it's easy to see exactly what's happening

## How it's organized

```bash
task-manager/
├── backend/
│ ├── controllers/tasksController.js ← the actual logic for each route
│ ├── routes/tasks.js ← just maps URLs to controller functions
│ ├── db.js ← connects to Postgres
│ ├── schema.sql ← creates the tasks table
│ └── server.js ← starts the Express app
└── frontend/
└── src/
├── api/tasks.js ← all the fetch() calls to the backend live here
├── components/
│ ├── TaskForm.jsx ← form for adding a task
│ ├── TaskList.jsx ← renders the list
│ ├── TaskItem.jsx ← one task row (checkbox, edit, delete)
│ └── SearchFilterBar.jsx ← search box + filter buttons
└── App.jsx ← holds all the state, ties everything together
```

## How to run it

**1. Set up the database first**

```bash
createdb task_manager
psql -d task_manager -f backend/schema.sql
```

(If `createdb` gives you a role/permission error on Linux, you might need to create a Postgres role matching your OS username first — run `sudo -i -u postgres` then `createuser --interactive`.)

**2. Start the backend**

```bash
cd backend
npm install
cp .env.example .env
```
Then open `.env` and fill in your real Postgres username/password/database name.

```bash
npm run dev
```
Should say `Server running on http://localhost:5000` and `Connected to PostgreSQL database`. If it doesn't say the second part, your `.env` values are probably wrong.

**3. Start the frontend** (in a separate terminal, keep the backend one running too)

```bash
cd frontend
npm install
npm run dev
```
Opens at `http://localhost:5173`.

You need both terminals running at the same time for the app to actually work, the frontend just talks to the backend over HTTP, they're two completely separate processes.

## API routes

| Method | URL | What it does |
|--------|-----|---------------|
| GET | `/api/tasks` | Get all tasks. Add `?search=...` and/or `?filter=...` to narrow results |
| POST | `/api/tasks` | Create a task |
| PUT | `/api/tasks/:id` | Update a task — used for both editing and toggling done/not done |
| DELETE | `/api/tasks/:id` | Delete a task |

## A few other notes

- Title validation happens on both the frontend (blocks the request before it's even sent) and the backend (returns a 400 error if an empty title somehow gets through anyway)
- The backend sends back proper status codes (400 for bad input, 404 if a task doesn't exist, 500 for actual server errors) with a message, so the frontend has something real to show instead of a generic error
- I used raw SQL queries instead of an ORM because it's more code to write, but every query is fully visible and easy for me to explain line by line