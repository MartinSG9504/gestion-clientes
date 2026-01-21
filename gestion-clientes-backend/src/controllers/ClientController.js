import pool from "../config/Db.js";

// Obtener todos los clientes con el nombre del usuario asociado
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        c.id,
        c.name,
        c.email,
        c.phone,
        c.company,
        c.status,
        c.notes,
        c.created_at,
        u.name AS usuario
      FROM clients c
      JOIN users u ON c.user_id = u.id
    `);

    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener clientes" });
  }
});

