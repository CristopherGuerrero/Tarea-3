import { useState } from "react";

function TaskList({ tasks, onEdit, onDelete }) {
  const [filter, setFilter] = useState("todos");

  const filteredTasks =
    filter === "todos"
      ? tasks
      : tasks.filter((t) => t.status === filter);

  const totalTareas = tasks.length;
  const totalFiltradas = filteredTasks.length;

  // Caso especial: no hay ninguna tarea creada todavía
  if (totalTareas === 0) {
    return (
      <div>
        <h2>Listado de tareas</h2>
        <p>
          No hay tareas registradas todavía. Crea tu primera tarea usando el
          formulario de arriba.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2>Listado de tareas</h2>

      {/* Filtro por estado */}
      <div
        style={{
          marginBottom: "1rem",
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
        }}
      >
        <label>Filtrar tareas por estado:</label>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="todos">Todos</option>
          <option value="pendiente">Pendiente</option>
          <option value="en-progreso">En progreso</option>
          <option value="completada">Completada</option>
        </select>
        <span style={{ fontSize: "0.9rem", color: "#555" }}>
          Mostrando <strong>{totalFiltradas}</strong> de{" "}
          <strong>{totalTareas}</strong> tareas
        </span>
      </div>

      {/* Texto informativo */}
      <p
        style={{
          fontSize: "0.85rem",
          color: "#777",
          marginBottom: "0.75rem",
        }}
      >
        Usa el filtro para ver solo las tareas pendientes, en progreso o
        completadas.
      </p>

      {filteredTasks.length === 0 ? (
        <p>
          No hay tareas que coincidan con el filtro seleccionado. Prueba con
          otro estado o quita el filtro.
        </p>
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
