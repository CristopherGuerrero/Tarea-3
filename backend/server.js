const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

// Base de datos simulada en memoria
let tasks = [];
let currentId = 1;

// Obtener todas las tareas
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// Crear una nueva tarea
app.post('/tasks', (req, res) => {
  const { title, description, status } = req.body;

  if (!title) {
    return res.status(400).json({ message: 'El título es obligatorio' });
  }

  const newTask = {
    id: currentId++,
    title,
    description: description || '',
    status: status || 'pendiente'
  };

  tasks.push(newTask);

  res.status(201).json(newTask);
});

// Actualizar una tarea
app.put('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { title, description, status } = req.body;

  const index = tasks.findIndex(task => task.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'Tarea no encontrada' });
  }

  tasks[index] = {
    ...tasks[index],
    title: title ?? tasks[index].title,
    description: description ?? tasks[index].description,
    status: status ?? tasks[index].status
  };

  res.json(tasks[index]);
});

// Eliminar una tarea
app.delete('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);

  const exists = tasks.some(task => task.id === id);
  if (!exists) {
    return res.status(404).json({ message: 'Tarea no encontrada' });
  }

  tasks = tasks.filter(task => task.id !== id);

  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Servidor backend listo en http://localhost:${PORT}`);
});
