import { useState } from "react";

function TaskList({ tasks, onEdit, onDelete }) {
  const [filter, setFilter] = useState("todos");

  // Filtrar tareas según estado seleccionado
  const filteredTasks =
    filter === "todos"
      ? tasks
      : tasks.filter((t) => t.status === filter);

  return (
    <div>
      <h2>Listado de tareas</h2>

      {/* ===== FILTRO POR ESTADO ===== */}
      <div style={{ marginBottom: "1rem" }}>
        <label style={{ marginRight: "0.5rem" }}>Filtrar por estado:</label>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="todos">Todos</option>
          <option value="pendiente">Pendiente</option>
          <option value="en-progreso">En progreso</option>
          <option value="completada">Completada</option>
        </select>
      </div>

      {/* ===== MENSAJE SI NO HAY TAREAS ===== */}
      {filteredTasks.length === 0 ? (
        <p>No hay tareas que coincidan con el filtro seleccionado.</p>
      ) : (
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
            {filteredTasks.map((t) => (
              <tr key={t.id}>
                <td>{t.id}</td>
                <td>{t.title}</td>
                <td>{t.description}</td>
                <td>{t.status}</td>
                <td>
                  <button onClick={() => onEdit(t)}>Editar</button>
                  <button
                    onClick={() => onDelete(t.id)}
                    style={{ marginLeft: "0.5rem" }}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default TaskList;
