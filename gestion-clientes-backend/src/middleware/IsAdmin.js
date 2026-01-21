// Middleware para verificar si el usuario es administrador
export default function isAdmin(req, res, next) {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ error: "Acceso solo para administradores" });
  }
  next();
}
