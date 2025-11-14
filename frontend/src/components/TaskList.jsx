function TaskList({ tasks, onEdit, onDelete }) {
  if (tasks.length === 0) {
    return <p>No hay tareas registradas.</p>;
  }

  return (
    <div>
      <h2>Listado de tareas</h2>
      <table border="1" cellPadding="8" cellSpacing="0">
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Descripción</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(t => (
            <tr key={t.id}>
              <td>{t.id}</td>
              <td>{t.title}</td>
              <td>{t.description}</td>
              <td>{t.status}</td>
              <td>
                <button onClick={() => onEdit(t)}>Editar</button>
                <button onClick={() => onDelete(t.id)} style={{ marginLeft: '0.5rem' }}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TaskList;
