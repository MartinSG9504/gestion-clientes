import { useEffect, useState } from "react";
import { createClient, updateClient } from "../api/Client";
import ConfirmModal from "./ConfirmModal";
import styles from "../styles/clientForm.module.css";

// Componente para el formulario de creacion/edicion de clientes
export default function ClientForm({ onCreated, editingClient }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: ""
  });

  const [original, setOriginal] = useState(null);

  const [modal, setModal] = useState({
    open: false,
    title: "",
    message: "",
    onConfirm: null
  });

  // cargar datos del cliente a editar
  useEffect(() => {
    if (editingClient) {
      setForm(editingClient);
      setOriginal(editingClient);
    } else {
      resetForm();
    }
  }, [editingClient]);

  function resetForm() {
    setForm({ name: "", email: "", phone: "", company: "" });
    setOriginal(null);
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function isSameData() {
    if (!original) return false;

    return (
      form.name === original.name &&
      form.email === original.email &&
      form.phone === original.phone &&
      form.company === original.company
    );
  }

  async function saveClient() {
    try {
      if (editingClient) {
        await updateClient(editingClient.id, form);
      } else {
        await createClient(form);
      }

      onCreated();
      resetForm();
      setModal({ open: false });
    } catch (err) {
      if (err.response?.status === 409) {
        setModal({
          open: true,
          title: "Error",
          message: err.response.data.error || "Este cliente ya existe",
          onConfirm: null
        });
      } else {
        setModal({
          open: true,
          title: "Error",
          message: "Ocurrió un error al guardar el cliente",
          onConfirm: null
        });
      }
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (editingClient) {
      setModal({
        open: true,
        title: isSameData() ? "Sin cambios" : "Confirmar actualización",
        message: isSameData()
          ? "No hiciste ningún cambio. ¿Querés actualizar igual?"
          : "¿Seguro que querés actualizar este cliente?",
        onConfirm: saveClient
      });
    } else {
      setModal({
        open: true,
        title: "Confirmar creación",
        message: "¿Seguro que querés agregar este cliente?",
        onConfirm: saveClient
      });
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          name="name"
          placeholder="Nombre"
          required
          value={form.name}
          onChange={handleChange}
        />

        <input
          name="email"
          placeholder="Email"
          required
          value={form.email}
          onChange={handleChange}
        />

        <input
          name="phone"
          placeholder="Teléfono"
          required
          value={form.phone}
          onChange={handleChange}
        />

        <input
          name="company"
          placeholder="Empresa"
          required
          value={form.company}
          onChange={handleChange}
        />

        <button type="submit" className={styles.button}>
          {editingClient ? "Actualizar" : "Agregar"}
        </button>
      </form>

      <ConfirmModal
        open={modal.open}
        title={modal.title}
        message={modal.message}
        onCancel={() => setModal({ open: false })}
        onConfirm={modal.onConfirm}
      />
    </>
  );
}
