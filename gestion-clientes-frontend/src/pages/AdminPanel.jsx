import { useEffect, useState } from "react";
import {
  fetchUsers,
  updateUserRole,
  createUser,
  deleteUser
} from "../api/Admin";
import ConfirmModal from "../components/ConfirmModal";
import AdminUserForm from "../components/AdminUserForm";
import AdminUserTable from "../components/AdminUserTable";
import styles from "../styles/AdminPanel.module.css";

// Página del panel de administración
export default function AdminPanel() {
  const [users, setUsers] = useState([]);

  const [modal, setModal] = useState({
    open: false,
    title: "",
    message: "",
    onConfirm: null
  });

  async function load() {
    const data = await fetchUsers();
    setUsers(Array.isArray(data) ? data : []);
  }

  function confirmCreate(form, resetForm) {
    setModal({
      open: true,
      title: "Confirmar creación",
      message: "¿Seguro que querés crear este usuario?",
      onConfirm: async () => {
        try {
          await createUser(form);
          resetForm();
          await load();
          setModal({ open: false });
        } catch (err) {
          setModal({
            open: true,
            title: "Error",
            message: err?.response?.data?.error || "Ese usuario ya existe",
            onConfirm: null
          });
        }
      }
    });
  }

  function confirmChangeRole(id, role) {
    setModal({
      open: true,
      title: "Confirmar cambio de rol",
      message: `¿Seguro que querés cambiar el rol a "${role}"?`,
      onConfirm: async () => {
        try {
          await updateUserRole(id, role);
          await load();
          setModal({ open: false });
        } catch (err) {
          setModal({
            open: true,
            title: "Error",
            message:
              err?.response?.data?.error ||
              "No podés cambiar tu propio rol",
            onConfirm: null
          });
        }
      }
    });
  }

  function confirmDelete(id) {
    setModal({
      open: true,
      title: "Eliminar usuario",
      message: "⚠️ Esta acción no se puede deshacer",
      onConfirm: async () => {
        try {
          await deleteUser(id);
          await load();
          setModal({ open: false });
        } catch {
          setModal({
            open: true,
            title: "Error",
            message: "No se pudo eliminar el usuario",
            onConfirm: null
          });
        }
      }
    });
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>👑 Panel Admin</h2>

      <div className={styles.section}>
        <AdminUserForm onCreate={confirmCreate} />
      </div>

      <div className={styles.section}>
        <AdminUserTable
          users={users}
          onChangeRole={confirmChangeRole}
          onDelete={confirmDelete}
        />
      </div>

      <ConfirmModal
        open={modal.open}
        title={modal.title}
        message={modal.message}
        onCancel={() => setModal({ open: false })}
        onConfirm={modal.onConfirm}
      />
    </div>
  );
}
