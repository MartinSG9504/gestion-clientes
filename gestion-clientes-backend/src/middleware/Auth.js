import jwt from "jsonwebtoken";

// Middleware para autenticar solicitudes usando JWT
export default function auth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "No autorizado: falta token" });
  }

  if (!authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Token malformado" });
  }
// Extraer el token del encabezado
  const token = authHeader.split(" ")[1];

// Verificar el token y adjuntar la información del usuario a la solicitud  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("JWT ERROR:", error.message);
    return res.status(401).json({ error: "Token inválido o expirado" });
  }
}
