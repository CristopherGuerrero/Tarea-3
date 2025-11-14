import { useEffect, useState } from 'react';

function TaskForm({ onCreate, onUpdate, editingTask, onCancelEdit }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('pendiente');

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description || '');
      setStatus(editingTask.status || 'pendiente');
    } else {
      setTitle('');
      setDescription('');
      setStatus('pendiente');
    }
  }, [editingTask]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = { title, description, status };

    if (editingTask) {
      onUpdate(editingTask.id, data);
    } else {
      onCreate(data);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
      <h2>{editingTask ? 'Editar tarea' : 'Nueva tarea'}</h2>
      <div>
        <label>Título:</label><br />
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Descripción:</label><br />
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
      </div>
      <div>
        <label>Estado:</label><br />
        <select
          value={status}
          onChange={e => setStatus(e.target.value)}
        >
          <option value="pendiente">Pendiente</option>
          <option value="en-progreso">En progreso</option>
          <option value="completada">Completada</option>
        </select>
      </div>
      <button type="submit" style={{ marginTop: '0.5rem' }}>
        {editingTask ? 'Actualizar' : 'Crear'}
      </button>
      {editingTask && (
        <button
          type="button"
          onClick={onCancelEdit}
          style={{ marginLeft: '0.5rem' }}
        >
          Cancelar
        </button>
      )}
    </form>
  );
}

export default TaskForm;
