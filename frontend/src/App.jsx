import { useEffect, useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

const API_URL = 'http://localhost:4000/tasks';

function App() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setTasks(data);
    } catch (error) {
      console.error('Error al obtener tareas:', error);
    }
  };

  const handleCreate = async (taskData) => {
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(taskData),
      });
      if (res.ok) {
        await fetchTasks();
      }
    } catch (error) {
      console.error('Error al crear tarea:', error);
    }
  };

  const handleUpdate = async (id, taskData) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(taskData),
      });
      if (res.ok) {
        setEditingTask(null);
        await fetchTasks();
      }
    } catch (error) {
      console.error('Error al actualizar tarea:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        await fetchTasks();
      }
    } catch (error) {
      console.error('Error al eliminar tarea:', error);
    }
  };

  const startEdit = (task) => {
    setEditingTask(task);
  };

  const cancelEdit = () => {
    setEditingTask(null);
  };

  return (
    <div className="container">
      <h1>Gestor de Tareas CRUD</h1>
      <p style={{ marginBottom: '1rem', color: '#555' }}>
        Administra tus tareas: crea nuevas actividades, actualiza su estado
        y elimina las que ya no necesites.
      </p>

      <TaskForm
        onCreate={handleCreate}
        onUpdate={handleUpdate}
        editingTask={editingTask}
        onCancelEdit={cancelEdit}
      />
      <TaskList
        tasks={tasks}
        onEdit={startEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default App;
