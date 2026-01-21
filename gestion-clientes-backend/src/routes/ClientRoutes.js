import express from "express";
import pool from "../config/Db.js";
import auth from "../middleware/Auth.js";
import isAdmin from "../middleware/IsAdmin.js";


const router = express.Router();

// Obtener todos los clientes (según rol)
router.get("/", auth, async (req, res) => {
  try {
    const user = req.user;
    let rows;

    if (user.role === "admin") {
      // Admin ve todos
      [rows] = await pool.query(`
        SELECT c.*, u.name AS usuario
        FROM clients c
        JOIN users u ON c.user_id = u.id
      `);
    } else {
      // Usuario normal solo los suyos
      [rows] = await pool.query(
        `
        SELECT c.*, u.name AS usuario
        FROM clients c
        JOIN users u ON c.user_id = u.id
        WHERE c.user_id = ?
        `,
        [user.id]
      );
    }

    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener clientes" });
  }
});

// Obtener todos los clientes con emails (solo admin)
router.get("/admin/all", auth, isAdmin, async (req, res) => {
  const [rows] = await pool.query(`
    SELECT c.*, u.name AS usuario, u.email
    FROM clients c
    JOIN users u ON c.user_id = u.id
  `);

  res.json(rows);
});

// Crear nuevo cliente 
router.post("/", auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, email, phone, company, status, notes } = req.body;

    if (!name || !email || !phone || !company) {
      return res.status(400).json({
        error: "Todos los campos son obligatorios"
      });
    }

    // 🔎 VERIFICAR CLIENTE DUPLICADO
    const [existing] = await pool.query(
      `SELECT id FROM clients 
       WHERE email = ? AND user_id = ?`,
      [email, userId]
    );

    if (existing.length > 0) {
      return res.status(409).json({
        error: "Ya tenés un cliente registrado con ese email"
      });
    }

    // ✅ INSERTAR SI NO EXISTE
    const [result] = await pool.query(
      `INSERT INTO clients 
       (user_id, name, email, phone, company, status, notes) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [userId, name, email, phone, company, status || "lead", notes]
    );

    res.json({ id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al crear cliente" });
  }
});


// Editar cliente 
router.put("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user;
    const { name, email, phone, company, status, notes } = req.body;

    let result;

    if (user.role === "admin") {
      // Admin puede editar cualquiera
      [result] = await pool.query(
        `UPDATE clients 
         SET name = ?, email = ?, phone = ?, company = ?, status = ?, notes = ?
         WHERE id = ?`,
        [name, email, phone, company, status, notes, id]
      );
    } else {
      // Usuario solo los suyos
      [result] = await pool.query(
        `UPDATE clients 
         SET name = ?, email = ?, phone = ?, company = ?, status = ?, notes = ?
         WHERE id = ? AND user_id = ?`,
        [name, email, phone, company, status, notes, id, user.id]
      );
    }

    if (result.affectedRows === 0) {
      return res.status(403).json({ error: "No autorizado o cliente no existe" });
    }

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al actualizar cliente" });
  }
});

// Borrar cliente 
router.delete("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user;

    let result;

    if (user.role === "admin") {
      // Admin borra cualquiera
      [result] = await pool.query(
        "DELETE FROM clients WHERE id = ?",
        [id]
      );
    } else {
      // Usuario solo los suyos
      [result] = await pool.query(
        "DELETE FROM clients WHERE id = ? AND user_id = ?",
        [id, user.id]
      );
    }

    if (result.affectedRows === 0) {
      return res.status(403).json({ error: "No autorizado o cliente no existe" });
    }

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al borrar cliente" });
  }
});

export default router;