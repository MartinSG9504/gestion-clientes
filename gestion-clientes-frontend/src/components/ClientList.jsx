import { useState } from "react";
import ClientRow from "./clientRow";
import ConfirmModal from "./ConfirmModal";
import styles from "../styles/clientList.module.css";

// Componente para la lista de clientes
export default function ClientList({ clients = [], onDelete, onEdit, user }) {
  const [clientToDelete, setClientToDelete] = useState(null);

  return (
    <>
      <h2 className={styles.title}>Clientes</h2>

      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Empresa</th>
            {user?.role === "admin" && <th>Usuario</th>}
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody className={styles.tbody}>
          {clients.length === 0 && (
            <tr>
              <td
                colSpan={user?.role === "admin" ? 6 : 5}
                className={styles.empty}
              >
                No hay clientes
              </td>
            </tr>
          )}

          {clients.map(client => (
            <ClientRow
              key={client.id}
              client={client}
              user={user}
              onEdit={onEdit}
              onDelete={() => setClientToDelete(client)}
            />
          ))}
        </tbody>
      </table>

      <ConfirmModal
        open={!!clientToDelete}
        title="Eliminar cliente"
        message={
          clientToDelete
            ? `¿Seguro que querés eliminar a ${clientToDelete.name}?`
            : ""
        }
        onCancel={() => setClientToDelete(null)}
        onConfirm={async () => {
          await onDelete(clientToDelete.id);
          setClientToDelete(null);
        }}
      />
    </>
  );
}
