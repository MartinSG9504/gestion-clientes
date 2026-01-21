// funcion para verificar si un token JWT es valido 
export function isTokenValid(token) {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const now = Date.now() / 1000;
    return payload.exp > now;
  } catch {
    return false;
  }
}
