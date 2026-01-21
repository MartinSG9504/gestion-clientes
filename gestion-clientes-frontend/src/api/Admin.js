const API = `${import.meta.env.VITE_API_URL}/api/Admin`;

// funcion para obtener el token de autenticacion almacenado en el localStorage
function getToken() {
  return localStorage.getItem("token");
}

// funcion para manejar las respuestas de la API
async function handleResponse(res) {
  const data = await res.json();
  if (!res.ok) throw data;
  return data;
}

// funcion para obtener la lista de usuarios
export async function fetchUsers() {
  const res = await fetch(`${API}/users`, {
    headers: {
      Authorization: "Bearer " + getToken()
    }
  });
  return handleResponse(res);
}

// funcion para actualizar el rol de un usuario
export async function updateUserRole(id, role) {
  const res = await fetch(`${API}/users/${id}/role`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getToken()
    },
    body: JSON.stringify({ role })
  });
  return handleResponse(res);
}

// funcion para crear un nuevo usuario
export async function createUser(data) {
  const res = await fetch(`${API}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getToken()
    },
    body: JSON.stringify(data)
  });
  return handleResponse(res);
}

// funcion para eliminar un usuario
export async function deleteUser(id) {
  const res = await fetch(`${API}/users/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + getToken()
    }
  });
  return handleResponse(res);
}
