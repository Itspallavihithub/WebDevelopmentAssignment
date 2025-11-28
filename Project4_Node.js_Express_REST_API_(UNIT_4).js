// Topics:

// Node.js basic server

// HTTP requests / responses

// Express routing

// Async JS, callbacks/promises

// File system (fs)

// RESTful API with Node + Express

// Example: Simple Students API 



// {
//   "name": "node-express-api",
//   "version": "1.0.0",
//   "main": "server.js",
//   "type": "module",
//   "scripts": {
//     "start": "node server.js"
//   },
//   "dependencies": {
//     "express": "^4.19.0"
//   }
// }
 

import express from "express";
import fs from "fs/promises";
import path from "path";

const app = express();
const PORT = 3000;

const dataPath = path.join(process.cwd(), "students.json");

app.use(express.json());

// Helper to read file
async function readStudents() {
  const data = await fs.readFile(dataPath, "utf-8");
  return JSON.parse(data);
}

// Helper to write file
async function writeStudents(students) {
  await fs.writeFile(dataPath, JSON.stringify(students, null, 2));
}

// GET all
app.get("/api/students", async (req, res) => {
  const students = await readStudents();
  res.json(students);
});

// GET by id
app.get("/api/students/:id", async (req, res) => {
  const students = await readStudents();
  const student = students.find((s) => s.id === Number(req.params.id));
  if (!student) return res.status(404).json({ message: "Not found" });
  res.json(student);
});

// POST create
app.post("/api/students", async (req, res) => {
  const { name, section } = req.body;
  const students = await readStudents();
  const newStudent = {
    id: Date.now(),
    name,
    section,
  };
  students.push(newStudent);
  await writeStudents(students);
  res.status(201).json(newStudent);
});

// PUT update
app.put("/api/students/:id", async (req, res) => {
  const { name, section } = req.body;
  const students = await readStudents();
  const index = students.findIndex((s) => s.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Not found" });

  students[index] = { ...students[index], name, section };
  await writeStudents(students);
  res.json(students[index]);
});

// DELETE
app.delete("/api/students/:id", async (req, res) => {
  const students = await readStudents();
  const filtered = students.filter((s) => s.id !== Number(req.params.id));
  await writeStudents(filtered);
  res.json({ message: "Deleted" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
 