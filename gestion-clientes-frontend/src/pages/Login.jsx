import { useState } from "react";
import axios from "axios";
import styles from "../styles/Login.module.css";

const API = import.meta.env.VITE_API_URL;

// Página de login y registro
export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!email || !password || (isRegister && !name)) {
      setError("Completá todos los campos");
      return;
    }

    try {
      const endpoint = isRegister ? "/auth/register" : "/auth/login";
      const res = await axios.post(`${API}${endpoint}`, {
        ...(isRegister && { name }),
        email,
        password
      });

      localStorage.setItem("token", res.data.token);
      onLogin(res.data.user);

      setEmail("");
      setPassword("");
      setName("");
    } catch (err) {
      setError(
        err.response?.data?.error ||
        "Error al conectar con el servidor"
      );
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h2 className={styles.title}>
          {isRegister ? "Crear cuenta" : "Iniciar sesión"}
        </h2>

        <form onSubmit={handleSubmit} className={styles.form}>
          {isRegister && (
            <input
              placeholder="Nombre"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
          )}

          <input
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />

          <button type="submit">
            {isRegister ? "Crear cuenta" : "Entrar"}
          </button>
        </form>

        {error && <p className={styles.error}>{error}</p>}

        <p className={styles.switch}>
          {isRegister ? "¿Ya tenés cuenta?" : "¿No tenés cuenta?"}{" "}
          <button
            type="button"
            className={styles.switchButton}
            onClick={() => setIsRegister(!isRegister)}
          >
            {isRegister ? "Iniciar sesión" : "Crear cuenta"}
          </button>
        </p>
      </div>
    </div>
  );
}