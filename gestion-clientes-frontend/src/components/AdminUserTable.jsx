import styles from "../styles/adminUserTable.module.css";

// Tabla de usuarios
export default function AdminUserTable({
  users = [],
  onChangeRole,
  onDelete
}) {
  return (
    <>
      <h3 className={styles.title}>Usuarios</h3>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {users.length === 0 && (
            <tr>
              <td colSpan="4" className={styles.empty}>
                No hay usuarios
              </td>
            </tr>
          )}

          {users.map(u => (
            <tr key={u.id}>
              <td data-label="Nombre">{u.name}</td>
              <td data-label="Email" className={styles.email}>{u.email}</td>
              <td data-label="Rol">{u.role}</td>

              <td data-label="Acciones" className={styles.actions}>
                <button
                  onClick={() =>
                    onChangeRole(
                      u.id,
                      u.role === "admin" ? "user" : "admin"
                    )
                  }
                >
                  Cambiar rol
                </button>

                <button
                  onClick={() => onDelete(u.id)}
                  className={styles.delete}
                >
                  ❌
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
