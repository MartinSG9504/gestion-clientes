import styles from "../styles/ClientRow.module.css";

// Fila de cliente
export default function ClientRow({ client, user, onEdit, onDelete }) {
  return (
    <tr className={styles.row}>
      <td data-label="Nombre">{client.name}</td>
      <td data-label="Email">{client.email}</td>
      <td data-label="Teléfono">{client.phone}</td>
      <td data-label="Empresa">{client.company}</td>

      {user?.role === "admin" && (
        <td data-label="Usuario">{client.usuario || "-"}</td>
      )}

      <td data-label="Acciones" className={styles.actions}>
        <button onClick={() => onEdit(client)}>Editar</button>
        <button
          onClick={onDelete}
          className={styles.delete}
        >
          ❌
        </button>
      </td>
    </tr>
  );
}
