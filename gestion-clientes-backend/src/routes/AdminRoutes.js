import express from "express";
import pool from "../config/Db.js";
import auth from "../middleware/Auth.js";
import isAdmin from "../middleware/IsAdmin.js";
import bcrypt from "bcryptjs";


const router = express.Router();

// Obtener todos los usuarios
router.get("/users", auth, isAdmin, async (req, res) => {
  try {
    const [users] = await pool.query(
      "SELECT id, name, email, role FROM users ORDER BY id"
    );
    res.json(users);
  } catch (err) {
    console.error("Error al obtener usuarios:", err);
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
});

// Crear un nuevo usuario
router.post("/users", auth, isAdmin, async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    const finalRole = role === "admin" ? "admin" : "user";

    // Verificar email
    const [existing] = await pool.query(
      "SELECT id FROM users WHERE email = ?",
      [email]
    );

    if (existing.length > 0) {
      return res.status(400).json({ error: "El email ya existe" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const [result] = await pool.query(
      "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
      [name, email, hashed, finalRole]
    );

    res.json({
      id: result.insertId,
      name,
      email,
      role: finalRole
    });
  } catch (err) {
    console.error("Error creando usuario:", err);
    res.status(500).json({ error: "Error al crear usuario" });
  }
});

// Eliminar un usuario
router.delete("/users/:id", auth, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    // No se puede borrar a sí mismo
    if (Number(id) === req.user.id) {
      return res.status(400).json({ error: "No podés borrarte a vos mismo" });
    }

    const [result] = await pool.query(
      "DELETE FROM users WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.json({ success: true });
  } catch (err) {
    console.error("Error eliminando usuario:", err);
    res.status(500).json({ error: "Error al eliminar usuario" });
  }
});

// Cambiar rol de un usuario
router.put("/users/:id/role", auth, isAdmin, async (req, res) => {
  try {
    const { role } = req.body;
    const { id } = req.params;

    if (!["admin", "user"].includes(role)) {
      return res.status(400).json({ error: "Rol inválido" });
    }

    if (Number(id) === req.user.id) {
      return res.status(400).json({ error: "No podés cambiar tu propio rol" });
    }

    const [result] = await pool.query(
      "UPDATE users SET role = ? WHERE id = ?",
      [role, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.json({ success: true });
  } catch (err) {
    console.error("Error cambiando rol:", err);
    res.status(500).json({ error: "Error al cambiar rol" });
  }
});

export default router;
