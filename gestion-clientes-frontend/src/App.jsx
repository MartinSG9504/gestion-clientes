import { useState, useEffect } from "react";
import { fetchClients, deleteClient } from "./api/client";
import ClientForm from "./components/clientForm";
import ClientList from "./components/clientList";
import Login from "./pages/login";
import { isTokenValid } from "./utils/jwt";
import AdminPanel from "./pages/adminPanel";
import styles from "./styles/app.module.css";

// Componente principal de la app
export default function App() {
  const [user, setUser] = useState(null);
  const [clients, setClients] = useState([]);
  const [editingClient, setEditingClient] = useState(null);
  const [showAdmin, setShowAdmin] = useState(false);

  // Cargar clientes
  async function loadClients() {
    try {
      const data = await fetchClients();
      setClients(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error cargando clientes", err);
      setClients([]);
    }
  }

  // Eliminar cliente
  async function handleDelete(id) {
    await deleteClient(id);
    loadClients();
  }

  // Manejar logout
  function handleLogout() {
    localStorage.removeItem("token");
    setUser(null);
    setClients([]);
    setEditingClient(null);
    setShowAdmin(false);
  }

  // Verificar token al cargar la app
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token || !isTokenValid(token)) {
      localStorage.removeItem("token");
      setUser(null);
      return;
    }

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setUser(payload);
      loadClients();
    } catch (err) {
      console.error("Token inválido", err);
      localStorage.removeItem("token");
      setUser(null);
    }
  }, []);

  // Si no hay usuario, mostrar login
  if (!user) {
    return (
      <Login
        onLogin={userData => {
          setUser(userData);
          loadClients();
        }}
      />
    );
  }

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <h2>📋 Gestión de Clientes</h2>

        <div className={styles.userInfo}>
          <span>
            {user.name}
            <span
              className={`${styles.badge} ${
                user.role === "admin" ? styles.admin : styles.user
              }`}
            >
              {user.role}
            </span>
          </span>

          {user.role === "admin" && (
            <button onClick={() => setShowAdmin(!showAdmin)}>
              {showAdmin ? "Cerrar Admin" : "Panel Admin"}
            </button>
          )}

          <button onClick={handleLogout}>Salir</button>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.container}>
          {showAdmin && user.role === "admin" && (
            <div className={styles.adminSection}>
              <AdminPanel />
            </div>
          )}

          <ClientForm
            editingClient={editingClient}
            onCreated={() => {
              setEditingClient(null);
              loadClients();
            }}
          />

          <ClientList
            clients={clients}
            onDelete={handleDelete}
            onEdit={setEditingClient}
            user={user}
          />
        </div>
      </main>
    </div>
  );
}
