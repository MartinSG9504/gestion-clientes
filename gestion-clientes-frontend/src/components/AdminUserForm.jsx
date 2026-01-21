import { useState } from "react";
import styles from "../styles/adminUserForm.module.css";

// Formulario de creación de usuarios
export default function AdminUserForm({ onCreate }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user"
  });

  function resetForm() {
    setForm({
      name: "",
      email: "",
      password: "",
      role: "user"
    });
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onCreate(form, resetForm);
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        name="name"
        placeholder="Nombre"
        value={form.name}
        onChange={handleChange}
        autoComplete="name"
        required
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        autoComplete="email"
        required
      />

      <input
        type="password"
        name="password"
        placeholder="Contraseña"
        value={form.password}
        onChange={handleChange}
        autoComplete="new-password"
        required
      />

      <select
        name="role"
        className={styles.select}
        value={form.role}
        onChange={handleChange}
        aria-label="Rol del usuario"
      >
        <option value="user">Usuario</option>
        <option value="admin">Administrador</option>
      </select>

      <button type="submit" className={styles.submit}>
        Crear usuario
      </button>
    </form>
  );
}
