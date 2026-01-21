import styles from "../styles/ConfirmModal.module.css";

// Modal de confirmación reutilizable
export default function ConfirmModal({
  open,
  title,
  message,
  onConfirm,
  onCancel
}) {
  if (!open) return null;

  const isError = title === "Error";

  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.message}>{message}</p>

        <div className={styles.actions}>
          <button
            onClick={onCancel}
            className={styles.cancel}
          >
            {isError ? "Cerrar" : "Cancelar"}
          </button>

          {!isError && (
            <button
              onClick={onConfirm}
              className={styles.confirm}
            >
              Confirmar
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
